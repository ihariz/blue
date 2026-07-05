import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   OPENAI (REAL GPT BRAIN)
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   DATABASE CONNECT
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE DB CONNECTED"))
  .catch(err => console.log(err));

/* =========================
   USER MODEL
========================= */
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
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
  timestamp: { type: Date, default: Date.now }
});

const Memory = mongoose.model("blue_memory", MemorySchema);

/* =========================
   AUTH MIDDLEWARE
========================= */
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "NO TOKEN" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "INVALID TOKEN" });
  }
};

/* =========================
   REGISTER
========================= */
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hash
  });

  res.json({
    message: "USER CREATED",
    userId: user._id
  });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "USER NOT FOUND" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "WRONG PASSWORD" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

/* =========================
   🧠 REAL GPT BRAIN
========================= */
app.post("/api/brain", auth, async (req, res) => {
  const { input } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are BLUE V4 AI CORE. You are precise, structured, and intelligent."
        },
        {
          role: "user",
          content: input
        }
      ]
    });

    const output = completion.choices[0].message.content;

    await Memory.create({
      userId: req.user.id,
      input,
      output
    });

    res.json({
      system: "BLUE V4 REAL AI BRAIN",
      input,
      output
    });

  } catch (err) {
    res.status(500).json({
      error: "GPT BRAIN ERROR",
      details: err.message
    });
  }
});

/* =========================
   MEMORY
========================= */
app.get("/api/memory", auth, async (req, res) => {
  const data = await Memory.find({ userId: req.user.id })
    .sort({ timestamp: -1 })
    .limit(50);

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
    system: "BLUE V4 LIVE AI",
    status: "ONLINE",
    brain: "GPT-4o-mini",
    memory: "ACTIVE",
    auth: "JWT SECURED"
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BLUE V4 AI BRAIN LIVE ON PORT ${PORT}`);
});
