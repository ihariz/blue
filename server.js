import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import OpenAI from "openai";

dotenv.config();

const app = express();

/* =========================
   RENDER SAFE CONFIG
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   OPENAI GPT BRAIN (REAL)
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   DB CONNECT
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE V6 FIXED DB CONNECTED"))
  .catch(err => console.log(err));

/* =========================
   MEMORY SYSTEM
========================= */
const MemorySchema = new mongoose.Schema({
  userId: String,
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model("blue_memory", MemorySchema);

/* =========================
   AUTH (SIMPLE SAFE)
========================= */
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "NO TOKEN" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "INVALID TOKEN" });
  }
};

/* =========================
   ROOT CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    system: "BLUE V6 FIXED",
    status: "LIVE",
    brain: "GPT ACTIVE",
    time: new Date().toISOString()
  });
});

/* =========================
   🧠 REAL GPT BRAIN (FIXED)
========================= */
app.post("/api/brain", auth, async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "NO INPUT PROVIDED" });
  }

  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are BLUE V6 AI BRAIN. You are precise, structured, and helpful."
        },
        {
          role: "user",
          content: input
        }
      ]
    });

    const output = ai.choices[0].message.content;

    await Memory.create({
      userId: req.user.id,
      input,
      output
    });

    res.json({
      system: "BLUE V6 FIXED",
      input,
      output
    });

  } catch (err) {
    res.status(500).json({
      error: "GPT BRAIN ERROR",
      message: err.message
    });
  }
});

/* =========================
   MEMORY RECALL
========================= */
app.get("/api/memory", auth, async (req, res) => {
  const data = await Memory.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({
    system: "BLUE MEMORY",
    count: data.length,
    memory: data
  });
});

/* =========================
   STATUS CHECK (IMPORTANT FIX)
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V6 FIXED",
    version: "6.0.1",
    brain: "GPT-4o-mini ACTIVE",
    memory: "ONLINE",
    deploy: "RENDER READY"
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BLUE V6 FIXED RUNNING ON PORT ${PORT}`);
});
