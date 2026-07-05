import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// BLUE CORE STATUS
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V4",
    status: "ONLINE",
    mode: "AUTONOMOUS_CORE",
    time: new Date().toISOString(),
    version: "4.0.0"
  });
});

// AI CORE SIMULATION ENDPOINT
app.post("/api/brain", (req, res) => {
  const { input } = req.body;

  res.json({
    system: "BLUE V4 BRAIN",
    input,
    output: `Processed: ${input}`,
    intelligence: "adaptive",
    memory: false,
    timestamp: Date.now()
  });
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).send("BLUE V4 OK");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`BLUE V4 CORE RUNNING ON PORT ${PORT}`);
});
