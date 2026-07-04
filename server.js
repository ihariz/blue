import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { createClient } from "redis";
import Stripe from "stripe";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================
// DATABASE
// ======================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"));

// ======================
// REDIS
// ======================
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
}));

// ======================
// USER MODEL
// ======================
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" },
  plan: { type: String, default: "free" },
  stripeId: String
});

const User = mongoose.model("User", UserSchema);

// ======================
// AUTH
// ======================
function auth(req,res,next){
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "UNAUTHORIZED" });
  }
}

// ======================
// REGISTER / LOGIN
// ======================
app.post("/auth/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    email: req.body.email,
    password: hash
  });

  res.json(user);
});

app.post("/auth/login", async (req,res)=>{
  const user = await User.findOne({ email: req.body.email });

  if(!user) return res.status(404).send("NOT FOUND");

  const ok = await bcrypt.compare(req.body.password, user.password);

  if(!ok) return res.status(403).send("WRONG PASSWORD");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// ======================
// DASHBOARD (CACHE)
// ======================
app.get("/dashboard", auth, async (req,res)=>{
  const cache = await redis.get(`dash:${req.user.id}`);

  if(cache) return res.json(JSON.parse(cache));

  const data = {
    system: "BLUE SAAS PRODUCTION",
    user: req.user,
    status: "ACTIVE"
  };

  await redis.setEx(`dash:${req.user.id}`, 30, JSON.stringify(data));

  res.json(data);
});

// ======================
// STRIPE BILLING
// ======================
app.post("/billing/checkout", auth, async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1
    }],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.json({ url: session.url });
});

// ======================
// REALTIME SYSTEM
// ======================
io.on("connection",(socket)=>{
  socket.emit("system",{ status:"BLUE SAAS ONLINE" });

  socket.on("ping", ()=>{
    socket.emit("pong", Date.now());
  });
});

// ======================
server.listen(3000, ()=>{
  console.log("BLUE SAAS PRODUCTION RUNNING");
});
