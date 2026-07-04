// ===============================
// BLUE LEVEL 10 - ENTERPRISE SAAS CORE
// ===============================

import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { createClient } from "redis";
import Stripe from "stripe";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

// ===============================
// INIT CORE
// ===============================
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3000;

// ===============================
// DB (MongoDB)
// ===============================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===============================
// REDIS (CACHE)
// ===============================
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().then(() => console.log("Redis Connected"));

// ===============================
// SECURITY MIDDLEWARE
// ===============================
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rate limit (anti brute force / DDoS basic layer)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// ===============================
// RBAC ROLES
// ===============================
const ROLES = {
  USER: "user",
  ADMIN: "admin",
  AGENT: "agent"
};

// ===============================
// MONGOOSE MODEL
// ===============================
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" },
  plan: { type: String, default: "free" },
  stripeCustomerId: String
});

const User = mongoose.model("User", UserSchema);

// ===============================
// AUTH MIDDLEWARE
// ===============================
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "NO TOKEN" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "INVALID TOKEN" });
  }
}

// ===============================
// ROLE CHECK
// ===============================
function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "FORBIDDEN ROLE" });
    }
    next();
  };
}

// ===============================
// AUTH ROUTES
// ===============================
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role: ROLES.USER
  });

  res.json(user);
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "NOT FOUND" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ error: "WRONG PASSWORD" });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// ===============================
// DASHBOARD (SECURED)
// ===============================
app.get("/api/dashboard", auth, async (req, res) => {
  const cacheKey = `dashboard:${req.user.id}`;

  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const data = {
    user: req.user,
    system: "BLUE LEVEL 10 ENTERPRISE",
    ai: "ONLINE",
    realtime: true
  };

  await redis.setEx(cacheKey, 30, JSON.stringify(data));

  res.json(data);
});

// ===============================
// ADMIN PANEL
// ===============================
app.get("/api/admin", auth, allowRoles(ROLES.ADMIN), async (req, res) => {
  const users = await User.find();
  res.json({ totalUsers: users.length });
});

// ===============================
// STRIPE BILLING (SAAS CORE)
// ===============================
app.post("/api/billing/create-checkout", auth, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items
