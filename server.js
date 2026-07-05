import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

/* =========================
   LIGHTWEIGHT CONFIG
========================= */
app.use(cors());
app.use(express.json({ limit: "10kb" })); // protect CPU + memory

/* =========================
   GPT BRAIN (OPTIMIZED)
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   HEALTH CHECK (FAST)
========================= */
app.get("/", (req, res) => {
  res.json({
    system: "BLUE V6 LIGHT",
    status: "OK",
    cpu_mode: "0.1 SAFE"
  });
});

/* =========================
   🧠 AI BRAIN (FAST MODE)
========================= */
app.post("/api/brain", async (req, res) => {
  const input = req.body?.input;

  if (!input) {
    return res.status(400).json({ error: "NO INPUT" });
  }

  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4, // lower CPU + faster response style
      messages: [
        {
          role: "system",
          content: "You are BLUE LIGHT AI. Be short, fast, efficient."
        },
        {
          role: "user",
          content: input
        }
      ]
    });

    res.json({
      output: ai.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({
      error: "AI ERROR",
      message: err.message
    });
  }
});

/* =========================
   CPU SAFE SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE V6 LIGHT RUNNING (0.1 CPU SAFE)");
});
