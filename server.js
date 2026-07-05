import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECT
========================= */
const hasMongo = !!process.env.MONGO_URI;

if (hasMongo) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("BLUE V7 DB CONNECTED"))
    .catch(err => console.log(err));
}

/* =========================
   USER MEMORY MODEL
========================= */
const MemorySchema = new mongoose.Schema({
  userId: String,
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = hasMongo ? mongoose.model("blue_memory_v7", MemorySchema) : null;

/* =========================
   OPENAI BRAIN
========================= */
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/* =========================
   SIMPLE SESSION SYSTEM
========================= */
const sessions = new Map();

/* =========================
   DASHBOARD UI (SAAS OS)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>BLUE V7 SAAS OS</title>
<style>
body {
  margin:0;
  font-family: monospace;
  background:#050816;
  color:#00d4ff;
  display:flex;
}

.sidebar {
  width:220px;
  background:#0b1020;
  padding:20px;
  height:100vh;
  border-right:1px solid #00d4ff;
}

.main {
  flex:1;
  padding:20px;
}

.card {
  border:1px solid #00d4ff;
  padding:15px;
  margin-bottom:15px;
}

input, button {
  width:100%;
  padding:10px;
  margin-top:10px;
  background:#050816;
  border:1px solid #00d4ff;
  color:#00d4ff;
}
</style>
</head>

<body>

<div class="sidebar">
  <h3>BLUE V7 OS</h3>
  <p>Dashboard</p>
  <p>AI Brain</p>
  <p>Memory</p>
  <p>Users</p>
</div>

<div class="main">

  <div class="card">
    <h3>System Status</h3>
    <p>Server: ONLINE</p>
    <p>AI: ${openai ? "ACTIVE" : "OFF"}</p>
    <p>DB: ${hasMongo ? "MONGO CONNECTED" : "LOCAL"}</p>
  </div>

  <div class="card">
    <h3>AI Brain (V7)</h3>
    <input id="input" placeholder="Ask BLUE..." />
    <button onclick="send()">RUN</button>
    <p id="out"></p>
  </div>

</div>

<script>
async function send() {
  const input = document.getElementById("input").value;

  const res = await fetch("/api/brain", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ input })
  });

  const data = await res.json();
  document.getElementById("out").innerText = data.output;
}
</script>

</body>
</html>
  `);
});

/* =========================
   GET OR CREATE USER SESSION
========================= */
function getUser(req) {
  let userId = req.headers["x-user-id"];

  if (!userId) {
    userId = uuidv4();
  }

  if (!sessions.has(userId)) {
    sessions.set(userId, []);
  }

  return userId;
}

/* =========================
   AI BRAIN (USER-AWARE)
========================= */
app.post("/api/brain", async (req, res) => {
  try {
    const input = req.body.input;
    const userId = getUser(req);

    if (!openai) {
      return res.json({ output: "AI OFF (missing API key)" });
    }

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE V7 SaaS OS AI." },
        { role: "user", content: input }
      ]
    });

    const output = ai.choices[0].message.content;

    sessions.get(userId).push({ input, output });

    if (Memory) {
      await Memory.create({ userId, input, output });
    }

    res.json({
      userId,
      output
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

/* =========================
   USER MEMORY
========================= */
app.get("/api/memory/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (!Memory) {
    return res.json({ message: "DB OFF" });
  }

  const data = await Memory.find({ userId }).sort({ createdAt: -1 });

  res.json({ userId, memory: data });
});

/* =========================
   STATUS
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V7 SAAS OS",
    status: "ONLINE",
    users: sessions.size,
    ai: !!openai,
    db: hasMongo
  });
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V7 SAAS OS RUNNING");
});
