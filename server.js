import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   SAFE START (NO CRASH)
========================= */
const hasMongo = !!process.env.MONGO_URI;
const hasAI = !!process.env.OPENAI_API_KEY;

/* =========================
   MONGO (ONLY IF AVAILABLE)
========================= */
if (hasMongo) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("BLUE: MONGO CONNECTED"))
    .catch(err => console.log("MONGO ERROR:", err));
}

const MemorySchema = new mongoose.Schema({
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = hasMongo ? mongoose.model("blue_memory", MemorySchema) : null;

/* =========================
   OPENAI (SAFE INIT)
========================= */
const openai = hasAI
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/* =========================
   DASHBOARD (NO PLACEHOLDER)
========================= */
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>BLUE V6 SYSTEM</title>
    <style>
      body {
        margin:0;
        background:#050816;
        color:#00d4ff;
        font-family: monospace;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
      }
      .box {
        width:520px;
        border:1px solid #00d4ff;
        padding:20px;
        background:#0b1020;
      }
      .row {
        margin:8px 0;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <h2>BLUE V6 PRODUCTION SYSTEM</h2>

      <div class="row">Server: ONLINE</div>
      <div class="row">AI Brain: ${hasAI ? "ACTIVE" : "NOT CONNECTED"}</div>
      <div class="row">Memory: ${hasMongo ? "MONGODB ACTIVE" : "LOCAL MODE"}</div>
      <div class="row">Status: STABLE</div>
    </div>
  </body>
  </html>
  `);
});

/* =========================
   AI BRAIN (SAFE MODE)
========================= */
app.post("/api/brain", async (req, res) => {
  try {
    const { input } = req.body;

    if (!openai) {
      return res.json({
        output: "AI not connected. Missing OPENAI_API_KEY"
      });
    }

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE V6 AI SYSTEM." },
        { role: "user", content: input }
      ]
    });

    const output = ai.choices[0].message.content;

    if (Memory) {
      await Memory.create({ input, output });
    }

    res.json({ output });

  } catch (err) {
    res.json({ error: err.message });
  }
});

/* =========================
   MEMORY (SAFE)
========================= */
app.get("/api/memory", async (req, res) => {
  if (!Memory) {
    return res.json({
      message: "Memory not enabled (MongoDB missing)"
    });
  }

  const data = await Memory.find().sort({ createdAt: -1 }).limit(50);

  res.json({
    count: data.length,
    memory: data
  });
});

/* =========================
   STATUS
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V6 FIXED",
    status: "ONLINE",
    ai: hasAI ? "READY" : "OFF",
    memory: hasMongo ? "PERMANENT" : "LOCAL",
    uptime: process.uptime()
  });
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V6 FIXED RUNNING");
});
