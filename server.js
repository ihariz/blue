import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({ status: "BLUE V6 SAFE RUNNING" });
});

app.post("/api/brain", async (req, res) => {
  try {
    const { input } = req.body;

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BLUE AI." },
        { role: "user", content: input }
      ]
    });

    res.json({
      output: ai.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({
      error: "GPT FAILED",
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("BLUE SAFE RUNNING"));
