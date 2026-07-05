import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/**
 * =========================
 * MEMORY SYSTEM (SIMPLE SAAS CORE)
 * =========================
 */
const memoryDB = new Map();

/**
 * =========================
 * LANGUAGE ENGINE v9 (CLEAN COGNITIVE LAYER)
 * =========================
 */
function languageV9(input, memory) {
  return {
    intent: detectIntent(input),
    contextLevel: memory.length,
    tokens: tokenize(input),
    risk: input.length > 200 ? "high" : "low"
  };
}

function tokenize(input) {
  return input.split(" ").map((t, i) => ({
    token: t,
    index: i
  }));
}

function detectIntent(input) {
  if (input.includes("deploy")) return "DEPLOY";
  if (input.includes("scale")) return "SCALE";
  if (input.includes("analyze")) return "ANALYZE";
  if (input.includes("memory")) return "MEMORY";
  return "CHAT";
}

/**
 * =========================
 * EXECUTION ENGINE
 * =========================
 */
function execute(intent) {
  switch (intent) {
    case "DEPLOY":
      return { action: "deploy", status: "system deployed" };

    case "SCALE":
      return { action: "scale", status: "system scaled" };

    case "ANALYZE":
      return { action: "analysis", status: "data processed" };

    case "MEMORY":
      return { action: "memory", status: "memory retrieved" };

    default:
      return { action: "chat", status: "response generated" };
  }
}

/**
 * =========================
 * AI CORE
 * =========================
 */
function runAI(input, userId = "guest") {
  const memory = memoryDB.get(userId) || [];

  const lang = languageV9(input, memory);
  const result = execute(lang.intent);

  const updatedMemory = [
    ...memory,
    {
      input,
      intent: lang.intent,
      time: Date.now()
    }
  ];

  memoryDB.set(userId, updatedMemory);

  broadcast({
    type: "update",
    userId,
    result
  });

  return {
    input,
    userId,
    language: lang,
    result,
    memorySize: updatedMemory.length
  };
}

/**
 * =========================
 * API ROUTES
 * =========================
 */
app.get("/", (req, res) => {
  res.json({
    system: "BLUE v31",
    status: "online",
    type: "saas-ai-platform"
  });
});

app.post("/api/ai", (req, res) => {
  const { input, userId } = req.body;

  if (!input) {
    return res.status(400).json({ error: "input required" });
  }

  const output = runAI(input, userId || "guest");

  res.json(output);
});

app.get("/api/memory/:userId", (req, res) => {
  res.json(memoryDB.get(req.params.userId) || []);
});

/**
 * =========================
 * SERVER + WEBSOCKET
 * =========================
 */
const server = app.listen(process.env.PORT || 4000, () => {
  console.log("BLUE v31 RUNNING");
});

const wss = new WebSocketServer({ server });

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}
