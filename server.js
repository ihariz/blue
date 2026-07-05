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
 * AI ENDPOINT
 */
app.post("/api/ai", async (req, res) => {
  const input = req.body.input;

  const result = await runAI(input);

  memory.add({ input, result });

  broadcast({ type: "AI_RESULT", data: result });

  res.json(result);
});

/**
 * MEMORY VIEW (SaaS feature)
 */
app.get("/api/history", (req, res) => {
  res.json(memory.getAll());
});

/**
 * SERVER START
 */
const server = app.listen(process.env.PORT || 4000, () => {
  console.log("BLUE SaaS v28 RUNNING");
});

/**
 * WEBSOCKET (REALTIME DASHBOARD)
 */
const wss = new WebSocketServer({ server });

function broadcast(msg) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(msg));
    }
  });
}
