const express = require("express");
const os = require("os");

const app = express();
app.use(express.json());

// =====================
// BLUE STATE ENGINE
// =====================
const BLUE_STATE = {
  mode: "HYBRID",
  online: true,
  version: "BLUE_CORE_v1",
  timezone_layer: "UTC-12_to_UTC+14",
};

// =====================
// OFFLINE BRAIN
// =====================
function offlineBrain(input) {
  return {
    source: "offline",
    response: `BLUE OFFLINE CORE processed: ${input}`,
    intelligence: "local-simulated",
  };
}

// =====================
// ONLINE BRAIN (mock / API ready)
// =====================
async function onlineBrain(input) {
  try {
    // placeholder for real AI API (OpenAI / others)
    return {
      source: "online",
      response: `BLUE ONLINE CORE processed: ${input}`,
      intelligence: "cloud-enhanced",
    };
  } catch (e) {
    return offlineBrain(input);
  }
}

// =====================
// HYBRID ORCHESTRATOR
// =====================
async function blueCore(input) {
  const isOnline = BLUE_STATE.online;

  const offline = offlineBrain(input);

  if (!isOnline) {
    return {
      mode: "OFFLINE_ONLY",
      ...offline,
    };
  }

  const online = await onlineBrain(input);

  return {
    mode: "HYBRID_ACTIVE",
    merge: {
      offline: offline.response,
      online: online.response,
    },
    final: `BLUE HYBRID RESULT → ${online.response}`,
  };
}

// =====================
// API ROUTE
// =====================
app.post("/blue", async (req, res) => {
  const input = req.body.input || "empty";

  const result = await blueCore(input);

  res.json({
    system: BLUE_STATE,
    result,
    node: os.hostname(),
    time: new Date().toISOString(),
  });
});

// =====================
// STATUS
// =====================
app.get("/", (req, res) => {
  res.send("BLUE HYBRID CORE ACTIVE");
});

app.listen(3000, () => {
  console.log("BLUE CORE RUNNING ON PORT 3000");
});
