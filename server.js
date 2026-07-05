import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   OPENAI BRAIN
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   🏠 DASHBOARD UI (MAIN PAGE)
========================= */
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>BLUE V6 CONTROL ROOM</title>
    <style>
      body {
        margin:0;
        background:#050814;
        color:#00e5ff;
        font-family: monospace;
      }
      .header {
        padding:20px;
        text-align:center;
        font-size:24px;
        border-bottom:1px solid #00e5ff;
      }
      .grid {
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
        padding:20px;
      }
      .card {
        border:1px solid #00e5ff;
        padding:20px;
        border-radius:10px;
        box-shadow:0 0 15px #00e5ff33;
      }
      .status {
        color:#00ff88;
      }
      input, button {
        width:100%;
        padding:10px;
        margin-top:10px;
        background:#0b122a;
        border:1px solid #00e5ff;
        color:#00e5ff;
      }
      button {
        cursor:pointer;
      }
    </style>
  </head>
  <body>

    <div class="header">
      BLUE V6 AI CONTROL DASHBOARD
    </div>

    <div class="grid">

      <div class="card">
        <h3>🧠 AI BRAIN TEST</h3>
        <input id="input" placeholder="Ask BLUE..." />
        <button onclick="send()">RUN AI</button>
        <p id="out"></p>
      </div>

      <div class="card">
        <h3>📊 SYSTEM STATUS</h3>
        <p class="status">ONLINE</p>
        <p>Brain: GPT ACTIVE</p>
        <p>Mode: V6 FULL DASHBOARD</p>
        <p>Server: RENDER READY</p>
      </div>

    </div>

    <script>
      async function send() {
        const input = document.getElementById('input').value;

        const res = await fetch('/api/brain', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({input})
        });

        const data = await res.json();
        document.getElementById('out').innerText = data.output;
      }
    </script>

  </body>
  </html>
  `);
});

/* =========================
   🧠 REAL GPT BRAIN API
========================= */
app.post("/api/brain", async (req, res) => {
  const { input } = req.body;

  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are BLUE V6 AI SYSTEM. Be short, smart, and precise."
        },
        {
          role: "user",
          content: input
        }
      ]
    });

    res.json({
      system: "BLUE V6",
      output: ai.choices[0].message.content
    });

  } catch (err) {
    res.json({
      error: "AI FAILED",
      message: err.message
    });
  }
});

/* =========================
   📊 STATUS API
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V6 FULL",
    status: "ONLINE",
    brain: "GPT ACTIVE",
    dashboard: "LIVE"
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V6 FULL AI DASHBOARD RUNNING");
});
