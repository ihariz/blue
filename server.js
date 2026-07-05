import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hasMongo = !!process.env.MONGO_URI;
const hasAI = !!process.env.OPENAI_API_KEY;

/* =========================
   MONGODB
========================= */
if (hasMongo) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("BLUE SAAS: MONGO CONNECTED"))
    .catch(err => console.log(err));
}

const MemorySchema = new mongoose.Schema({
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = hasMongo ? mongoose.model("blue_memory", MemorySchema) : null;

/* =========================
   OPENAI
========================= */
const openai = hasAI
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/* =========================
   🟦 SAAS DASHBOARD UI
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>BLUE SAAS DASHBOARD</title>
<style>
body {
  margin:0;
  font-family: monospace;
  background:#050816;
  color:#00d4ff;
  display:flex;
}

/* SIDEBAR */
.sidebar {
  width:220px;
  background:#0b1020;
  padding:20px;
  border-right:1px solid #00d4ff;
  height:100vh;
}

.sidebar h2 {
  font-size:16px;
}

.menu {
  margin-top:20px;
}

.menu div {
  padding:10px;
  margin:5px 0;
  border:1px solid #00d4ff;
  cursor:pointer;
}

/* MAIN */
.main {
  flex:1;
  padding:20px;
}

.card {
  border:1px solid #00d4ff;
  padding:15px;
  margin-bottom:15px;
  background:#0b1020;
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
  <h2>BLUE SAAS</h2>

  <div class="menu">
    <div>Dashboard</div>
    <div>AI Brain</div>
    <div>Memory</div>
    <div>Status</div>
  </div>
</div>

<div class="main">

  <div class="card">
    <h3>System Status</h3>
    <p>Server: ONLINE</p>
    <p>AI: ${hasAI ? "ACTIVE" : "OFF"}</p>
    <p>Memory: ${hasMongo ? "MONGODB" : "LOCAL"}</p>
  </div>

  <div class="card">
    <h3>AI Brain</h3>
    <input id="input" placeholder="Ask BLUE..." />
    <button onclick="send()">Run AI</button>
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
   AI BRAIN
========================= */
app.post("/api/brain", async (req, res) => {
  try {
    const { input } = req.body;

    if (!openai) {
      return res.json({ output: "AI OFF - missing API key" });
    }

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE SAAS AI SYSTEM." },
        { role: "user", content: input }
      ]
    });

    const output = ai.choices[0].message.content;

    if (Memory) {
      await Memory.create({ input, output });
    }

    res.json({ output });

  } catch (err) {
    res.json({ error: err.message });
  }
});

/* =========================
   MEMORY API
========================= */
app.get("/api/memory", async (req, res) => {
  if (!Memory) return res.json({ message: "Memory OFF" });

  const data = await Memory.find().sort({ createdAt: -1 }).limit(50);

  res.json({ count: data.length, data });
});

/* =========================
   STATUS API
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE SAAS V6",
    status: "ONLINE",
    ai: hasAI,
    memory: hasMongo,
    uptime: process.uptime()
  });
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE SAAS DASHBOARD RUNNING");
});
