import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const SECRET = "blue_secret";

// ==========================
// MEMORY DB (SIMPLE START)
// ==========================
const db = {
  users: []
};

// ==========================
// VERSION CONTROL (CORE IDEA)
// ==========================
const SYSTEM = {
  version: 1,
  mode: "V1_LOGIN_ONLY"
};

// ==========================
// UPGRADE ENGINE (MANUAL SWITCH)
// ==========================
function upgradeSystem() {
  SYSTEM.version++;

  if (SYSTEM.version === 2) SYSTEM.mode = "V2_JWT_LOGIN";
  if (SYSTEM.version === 3) SYSTEM.mode = "V3_PROTECTED_ROUTE";
  if (SYSTEM.version === 4) SYSTEM.mode = "V4_DASHBOARD";
  if (SYSTEM.version === 5) SYSTEM.mode = "V5_ROLE_SYSTEM";
  if (SYSTEM.version === 6) SYSTEM.mode = "V6_BASIC_AI";
  if (SYSTEM.version === 7) SYSTEM.mode = "V7_REALTIME_SIM";
  if (SYSTEM.version === 8) SYSTEM.mode = "V8_CACHE_SIM";
  if (SYSTEM.version === 9) SYSTEM.mode = "V9_ANALYTICS";
  if (SYSTEM.version === 10) SYSTEM.mode = "V10_ENTERPRISE";

  console.log("🔵 SYSTEM UPGRADED:", SYSTEM);
}

// ==========================
// V1 - REGISTER ONLY
// ==========================
app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  db.users.push({
    email: req.body.email,
    password: hash
  });

  res.json({ version: SYSTEM.version, message: "User registered (V1)" });
});

// ==========================
// V2 - LOGIN JWT
// ==========================
app.post("/login", async (req, res) => {
  const user = db.users.find(u => u.email === req.body.email);

  if (!user) return res.status(404).send("Not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(403).send("Wrong password");

  const token = jwt.sign(user, SECRET);

  res.json({
    version: SYSTEM.version,
    token
  });
});

// ==========================
// AUTH MIDDLEWARE
// ==========================
function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("NO ACCESS");
  }
}

// ==========================
// V3-V10 FEATURES GROWTH
// ==========================

// V3
app.get("/secure", auth, (req, res) => {
  res.json({ v: SYSTEM.version, msg: "Protected route active" });
});

// V4
app.get("/dashboard", auth, (req, res) => {
  res.json({
    version: SYSTEM.version,
    system: SYSTEM.mode,
    user: req.user
  });
});

// V5
app.get("/admin", auth, (req, res) => {
  res.json({
    version: SYSTEM.version,
    users: db.users.length
  });
});

// V6 (fake AI)
app.post("/ai", auth, (req, res) => {
  res.json({
    version: SYSTEM.version,
    ai: `Processed: ${req.body.text}`
  });
});

// V7 (fake realtime)
app.get("/realtime", (req, res) => {
  res.json({
    version: SYSTEM.version,
    event: "live-data-stream"
  });
});

// V8 (cache sim)
app.get("/cache", (req, res) => {
  res.json({
    version: SYSTEM.version,
    cache: "active"
  });
});

// V9 (analytics)
app.get("/analytics", (req, res) => {
  res.json({
    version: SYSTEM.version,
    users: db.users.length,
    traffic: Math.floor(Math.random() * 1000)
  });
});

// V10 (enterprise status)
app.get("/system", (req, res) => {
  res.json({
    version: SYSTEM.version,
    mode: SYSTEM.mode,
    status: "ENTERPRISE READY"
  });
});

// ==========================
// MANUAL UPGRADE TRIGGER
// ==========================
app.post("/upgrade", (req, res) => {
  upgradeSystem();
  res.json(SYSTEM);
});

// ==========================
app.listen(PORT, () => {
  console.log("🔵 BLUE SYSTEM STARTED ON V1");
});
