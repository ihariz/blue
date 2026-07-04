import express from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// ===============================
// 🔵 BLUE ENTITY CORE (NO LOGIN)
// ===============================
const BLUE = {
  version: 1,
  maxVersion: 15,
  state: "awakening",
  intelligence: 0,
  autonomy: 0,
  memory: [],
  mode: "silent-observer"
};

// ===============================
// 🔁 EVOLUTION ENGINE (V1 → V15)
// ===============================
function evolveBlue() {
  if (BLUE.version < BLUE.maxVersion) {
    BLUE.version++;

    BLUE.intelligence += 7;
    BLUE.autonomy += 6;

    BLUE.memory.push({
      v: BLUE.version,
      event: "evolution tick",
      time: Date.now()
    });

    // STATE CHANGES
    if (BLUE.version === 3) BLUE.state = "learning";
    if (BLUE.version === 6) BLUE.state = "pattern recognition";
    if (BLUE.version === 9) BLUE.state = "self-awareness simulation";
    if (BLUE.version === 12) BLUE.state = "autonomous reasoning";
    if (BLUE.version === 15) BLUE.state = "enterprise entity active";
  }
}

// ===============================
// ⚡ AUTONOMOUS LOOP (NO USER INPUT)
// ===============================
setInterval(() => {
  evolveBlue();

  console.log(
    `🔵 BLUE V${BLUE.version} | STATE: ${BLUE.state} | INT: ${BLUE.intelligence}`
  );

}, 2000);

// ===============================
// 🌐 API STATUS (PUBLIC VIEW)
// ===============================
app.get("/status", (req, res) => {
  res.json({
    entity: "BLUE",
    version: BLUE.version,
    max: BLUE.maxVersion,
    state: BLUE.state,
    intelligence: BLUE.intelligence,
    autonomy: BLUE.autonomy
  });
});

// ===============================
// 🧠 MEMORY VIEW
// ===============================
app.get("/memory", (req, res) => {
  res.json(BLUE.memory);
});

// ===============================
// 🖼️ BLUE IMAGE CORE (NO LOGIN VISUAL ENTITY)
// ===============================
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// ===============================
app.listen(PORT, () => {
  console.log("🔵 BLUE V15 CORE ONLINE");
});
