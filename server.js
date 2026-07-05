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
   LIVE DASHBOARD (ROOT)
========================= */
app.get("/", (req, res) => {
  res.send(`
    <html>
    <body style="background:#0b0f1a;color:#00e5ff;font-family:monospace;text-align:center;padding-top:40px;">
      <h1>BLUE V6 LIVE SYSTEM</h1>
      <p>Status: ONLINE</p>
      <p>Mode: READY FOR GPT</p>
    </body>
    </html>
  `);
});

/* =========================
   🧠 AI BRAIN
========================= */
app.post("/api/brain", async (req, res) => {
  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE AI." },
        { role: "user", content: req.body.input }
      ]
    });

    res.json({
      output: ai.choices[0].message.content
    });

  } catch (err) {
    res.json({
      error: "AI ERROR",
      message: err.message
    });
  }
});

/* =========================
   STATUS
========================= */
app.get("/api/status", (req, res) => {
  res.json({
    system: "BLUE V6 LIVE",
    status: "RUNNING",
    brain: "GPT READY"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V6 LIVE RUNNING");
});
