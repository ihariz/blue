import express from "express";
import cors from "cors";
import { runGlobalAI } from "./ai/orchestrator.js";

const app = express();

app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    system: "BLUE v27",
    status: "ONLINE",
    mode: "GLOBAL AI CLOUD"
  });
});

// MAIN AI ENDPOINT
app.post("/ai", async (req, res) => {
  try {
    const result = await runGlobalAI(req.body.input);

    res.json({
      system: "BLUE v27 AUTONOMOUS CLOUD",
      result
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`BLUE v27 running on port ${PORT}`);
});
