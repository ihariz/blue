import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

import { runAI } from "./ai/engine.js";
import { memory } from "./memory/store.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/**
 * HEALTH CHECK
 */
app.get("/health", (req, res) => {
  res.json({
    system: "BLUE SAAS v28",
    status: "online",
    uptime: process.uptime()
  });
});

/**
 * MAIN AI ENDPOINT
 */
app.post("/api/ai", async (req, res) => {
  try {
    const input = req.body?.input;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "invalid input"
      });
    }

    const result = await runAI(input);

    memory.add({
      input,
      result,
      time: Date.now()
    });

    broadcast({
      type: "ai_result",
      data: result
    });

    res.json({
      input,
      result
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/**
 * MEMORY ENDPOINT
 */
app.get("/api/history", (req, res) => {
  res.json(memory.getAll());
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("BLUE SAAS v28 running");
});

/**
 * WEBSOCKET SERVER
 */
const wss = new WebSocketServer({ server });

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
}
