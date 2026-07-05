import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE V8 DB CONNECTED"))
  .catch(err => console.log(err));

/* =========================
   USER MODEL
========================= */
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
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

const Memory = mongoose.model("blue_memory_v8", MemorySchema);

/* =========================
   AI BRAIN
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   JWT AUTH
========================= */
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "NO TOKEN" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "INVALID TOKEN" });
  }
}

/* =========================
   REGISTER
========================= */
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hash
  });

  res.json({ message: "USER CREATED" });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "USER NOT FOUND" });

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(400).json({ error: "WRONG PASSWORD" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

/* =========================
   AI BRAIN (PROTECTED)
========================= */
app.post("/api/brain", auth, async (req, res) => {
  try {
    const {
