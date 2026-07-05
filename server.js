import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB (PERMANENT MEMORY)
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("BLUE MEMORY CONNECTED"))
  .catch(err => console.log("DB ERROR:", err));

const MemorySchema = new mongoose.Schema({
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model("blue_memory", MemorySchema);

/* =========================
   OPENAI BRAIN
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   DASHBOARD UI
========================= */
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>BLUE V6 FULL AI</title>
    <style>
      body {
        margin:0;
        background:#050816;
        color:#00d4ff;
        font-family: monospace;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
      }

      .box {
        width:500px;
        border:1px solid #00d4ff;
        padding:20px;
        background:#0b1020;
      }

      input, button {
        width:100%;
        padding:10px;
        margin-top:10px;
      }

      .status {
        margin-top:10px;
        color:#9fffd1;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <h2>BLUE V6 FULL AI SYSTEM</h2>

      <p>AI Brain: ACTIVE</p>
      <p>Memory: MONGODB</p>
      <p>Status: ONLINE</p>

      <input id="input" placeholder="Ask BLUE AI..." />
      <button onclick="send()">SEND</button>

      <p id="out" class="status"></p>
    </div>

    <script>
      async function send() {
        const input = document.getElementById("input").value;

        const res = await fetch("/api/brain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
   🧠 AI BRAIN + SAVE MEMORY
========================= */
app.post("/api/brain", async (req, res) => {
  try {
    const { input } = req.body;

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE V6 AI SYSTEM." },
        { role: "user", content: input }
      ]
    });

    const output = ai.choices[0].message.content;

    await Memory.create({ input, output });

    res.json({
      input,
      output,
      saved: true
    });

  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

/* =========================
   MEMORY VIEW
========================= */
app.get("/api/memory", async (req, res) => {
  const data = await Memory.find().sort({ createdAt: -1 }).limit(50);

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
    system: "BLUE V6 FULL",
    status: "ONLINE",
    ai: "ACTIVE",
    memory: "MONGODB",
    uptime: process.uptime()
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V6 FULL SYSTEM RUNNING");
});
