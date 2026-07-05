const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== BLUE CORE STATE =====
const BLUE = {
  name: "BLUE",
  version: "v16.0",
  status: "ACTIVE",
  timeLayer: "UTC+14",
  languages: ["en", "ms", "zh", "ar", "ja", "ko", "fr", "de", "es"],
  memory: {
    shortTerm: [],
    longTerm: []
  }
};

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== BASIC API =====
app.get("/api/status", (req, res) => {
  res.json({
    system: BLUE.name,
    version: BLUE.version,
    status: BLUE.status,
    timeLayer: BLUE.timeLayer,
    serverTime: new Date().toISOString()
  });
});

// ===== TIME LAYER (UTC+14 SIMULATION) =====
app.get("/api/time/utc14", (req, res) => {
  const now = new Date();

  // UTC+14 offset = +14 hours
  const utc14 = new Date(now.getTime() + (14 * 60 * 60 * 1000));

  res.json({
    layer: "UTC+14",
    time: utc14.toISOString(),
    note: "Front-edge global time layer (Kiribati / Line Islands)"
  });
});

// ===== MEMORY CORE (SIMPLE SIMULATION) =====
app.post("/api/memory/save", (req, res) => {
  const { data, type } = req.body;

  const entry = {
    id: Date.now(),
    type: type || "short",
    data,
    timestamp: new Date().toISOString()
  };

  if (entry.type === "long") {
    BLUE.memory.longTerm.push(entry);
  } else {
    BLUE.memory.shortTerm.push(entry);
  }

  res.json({ success: true, entry });
});

app.get("/api/memory", (req, res) => {
  res.json(BLUE.memory);
});

// ===== LANGUAGE SYSTEM =====
app.get("/api/languages", (req, res) => {
  res.json({
    active: BLUE.languages,
    default: "en",
    multilingual: true
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`BLUE SYSTEM ONLINE`);
  console.log(`PORT: ${PORT}`);
  console.log(`TIME LAYER: UTC+14 ACTIVE`);
});
