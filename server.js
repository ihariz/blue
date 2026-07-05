import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   AI BRAIN ENGINE (REAL GPT)
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   DATABASE
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE V6 DB ONLINE"))
  .catch(err => console.log(err));

/* =========================
   USER MODEL
========================= */
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("blue_users", UserSchema);

/* =========================
   MEMORY MODEL
========================= */
const MemorySchema = new mongoose.Schema({
  userId: String,
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model("blue_memory", MemorySchema);

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "NO TOKEN" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "INVALID TOKEN" });
  }
}

/* =========================
   🧠 BLUE V6 REAL AI BRAIN
========================= */
app.post("/api/brain", auth, async (req, res) => {
  const { input } = req.body;

  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are BLUE V6 AI OS. You are structured, autonomous, and precise."
        },
        { role: "user", content: input }
      ]
    });

    const output = ai.choices[0].message.content;

    await Memory.create({
      userId: req.user.id,
      input,
      output
    });

    res.json({
      system: "BLUE V6",
      input,
      output
    });

  } catch (err) {
    res.status(500).json({
      error: "AI FAILURE",
      details: err.message
    });
  }
});

/* =========================
   MEMORY RECALL SYSTEM
========================= */
app.get("/api/memory", auth, async (req, res) => {
  const data = await Memory.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({
    system: "BLUE MEMORY CORE",
    count: data.length,
    memory: data
  });
});

/* =========================
   STATUS ENGINE
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V6 AI OS",
    status: "ONLINE",
    brain: "GPT-4o-mini",
    memory: "ACTIVE",
    architecture: "MODULAR SaaS AI"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BLUE V6 AI OS RUNNING ON PORT ${PORT}`);
});
