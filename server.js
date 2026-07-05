import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECT
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE DB CONNECTED"))
  .catch(err => console.log("DB ERROR:", err));

/* =========================
   USER SCHEMA
========================= */
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("blue_users", UserSchema);

/* =========================
   MEMORY SCHEMA
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

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed
  });

  res.json({ message: "USER CREATED", userId: user._id });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "USER NOT FOUND" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "WRONG PASSWORD" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

/* =========================
   BLUE BRAIN (AI CORE LOGIC)
========================= */
app.post("/api/brain", auth, async (req, res) => {
  const { input } = req.body;

  const output = `BLUE processed: ${input}`;

  await Memory.create({
    userId: req.user.id,
    input,
    output
  });

  res.json({
    system: "BLUE V4",
    input,
    output
  });
});

/* =========================
   MEMORY RECALL
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
   STATUS CHECK
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V4 SAAS CORE",
    status: "ONLINE",
    modules: ["AUTH", "MEMORY", "BRAIN"],
    time: new Date().toISOString()
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BLUE V4 RUNNING ON PORT ${PORT}`);
});
