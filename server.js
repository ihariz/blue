// ===============================
// BLUE LEVEL 9 - ENTERPRISE CORE
// ===============================

import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "blue_secret_key";

// ===============================
// MIDDLEWARE - BLUE DEFENDER CORE
// ===============================
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Simple in-memory DB (upgrade ke MongoDB nanti)
const users = [];

// ===============================
// BLUE DEFENDER (SECURITY LAYER)
// ===============================
function blueDefender(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "BLUE DEFENDER: NO ACCESS" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "BLUE DEFENDER: INVALID TOKEN" });
  }
}

// ===============================
// AUTH ROUTES
// ===============================
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    email,
    password: hashed
  });

  res.json({ message: "User registered in BLUE system" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// ===============================
// DASHBOARD ROUTE (PROTECTED)
// ===============================
app.get("/api/dashboard", blueDefender, (req, res) => {
  res.json({
    message: "BLUE LEVEL 9 DASHBOARD ACTIVE",
    user: req.user,
    systemStatus: "OPTIMAL",
    aiCore: "ONLINE",
    defender: "ACTIVE"
  });
});

// ===============================
// AI CORE ENDPOINT (PLACEHOLDER)
// ===============================
app.post("/api/ai/query", blueDefender, (req, res) => {
  const { prompt } = req.body;

  res.json({
    input: prompt,
    response: `BLUE AI RESPONSE: ${prompt} processed successfully`,
    confidence: 0.93
  });
});

// ===============================
// REAL-TIME SYSTEM (SOCKET)
// ===============================
io.on("connection", (socket) => {
  console.log("BLUE NODE CONNECTED:", socket.id);

  socket.emit("status", {
    system: "BLUE LEVEL 9 ONLINE",
    time: new Date()
  });

  socket.on("ping", () => {
    socket.emit("pong", { time: Date.now() });
  });
});

// ===============================
server.listen(PORT, () => {
  console.log(`🔵 BLUE LEVEL 9 SERVER RUNNING ON PORT ${PORT}`);
});
