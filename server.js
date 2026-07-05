import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE DB CONNECTED"))
  .catch(err => console.log("DB ERROR:", err));

/* =========================
   MEMORY SCHEMA
========================= */
const MemorySchema = new mongoose.Schema({
  input: String,
  output: String,
  timestamp: { type: Date, default: Date.now }
});

const Memory = mongoose.model("blue_memory", MemorySchema);

/* =========================
   STATUS
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V4",
    status: "ONLINE",
    memory: "ACTIVE",
    database: "MONGO_CONNECTED"
  });
});

/* =========================
   BRAIN + MEMORY WRITE
========================= */
app.post("/api/brain", async (req, res) => {
  const { input } = req.body;

  const output = `Processed: ${input}`;

  // Save to memory DB
  const record = new Memory({
    input,
    output
  });

  await record.save();

  res.json({
    system: "BLUE V4 BRAIN",
    input,
    output,
    memory: "SAVED",
    timestamp: Date.now()
  });
});

/* =========================
   MEMORY RECALL
========================= */
app.get("/api/memory", async (req, res) => {
  const logs = await Memory.find().sort({ timestamp: -1 }).limit(20);

  res.json({
    system: "BLUE MEMORY CORE",
    count: logs.length,
    data: logs
  });
});

/* =========================
   HEALTH
========================= */
app.get("/health", (req, res) => {
  res.send("BLUE V4 OK + MEMORY ACTIVE");
});

/* =========================
   START
========================= */
app.listen(PORT, () => {
  console.log(`BLUE V4 MEMORY CORE RUNNING ON PORT ${PORT}`);
});
