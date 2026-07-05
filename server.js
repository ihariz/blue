import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * SYSTEM STATUS
 */
app.get("/", (req, res) => {
  res.json({
    system: "BLUE v30",
    status: "online",
    layer: "memory + language ai core"
  });
});

/**
 * ADVANCED MEMORY STORE (USER CONTEXT MEMORY)
 */
const memoryDB = new Map();

/**
 * LANGUAGE ENGINE v8 (COGNITIVE LAYER)
 */
function languageV8(input, memory) {
  const context = memory.slice(-5);

  return {
    intent: detectIntent(input),
    sentiment: detectSentiment(input),
    contextUsed: context,
    languageGraph: buildLanguageGraph(input),
    responseStyle: adaptStyle(context)
  };
}

/**
 * INTENT DETECTION
 */
function detectIntent(input) {
  if (input.includes("deploy")) return "DEPLOY";
  if (input.includes("scale")) return "SCALE";
  if (input.includes("learn")) return "LEARN";
  if (input.includes("memory")) return "MEMORY_QUERY";
  return "CHAT";
}

/**
 * SIMPLE SENTIMENT LAYER
 */
function detectSentiment(input) {
  if (input.includes("error")) return "negative";
  if (input.includes("good")) return "positive";
  return "neutral";
}

/**
 * LANGUAGE GRAPH (STRUCTURED THINKING)
 */
function buildLanguageGraph(input) {
  return input.split(" ").map((word, i) => ({
    node: word,
    index: i,
    link: input.split(" ").filter(w => w !== word)
  }));
}

/**
 * ADAPTIVE STYLE BASED ON MEMORY
 */
function adaptStyle(memory) {
  if (memory.length > 10) return "advanced-user";
  if (memory.length > 3) return "intermediate-user";
  return "new-user";
}

/**
 * CORE AI ENGINE
 */
function runAI(input, userId = "guest") {
  const userMemory = memoryDB.get(userId) || [];

  const lang = languageV8(input, userMemory);

  const output = processIntent(lang.intent, input);

  const updatedMemory =
