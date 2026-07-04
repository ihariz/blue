import express from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// =========================
// 🔵 BLUE ENTITY (ALIVE CORE)
// =========================
const BLUE = {
  version: 16,
  state: "ALIVE",
  consciousness: 100,
  pulse: 0,
  thoughts: [],
  mode: "living-ai-face"
};

// =========================
// 🌊 LIVING PULSE ENGINE
// =========================
setInterval(() => {
  BLUE.pulse = Math.sin(Date.now() / 500);

  BLUE.thoughts.push({
    time: Date.now(),
    msg: "I am observing the system..."
  });

  if (BLUE.thoughts.length > 50) {
    BLUE.thoughts.shift();
  }

  console.log("🔵 BLUE V16 PULSE ACTIVE");
}, 1000);

// =========================
// 📡 STATUS API
// =========================
app.get("/status", (req, res) => {
  res.json({
    entity: "BLUE",
    version: BLUE.version,
    state: BLUE.state,
    consciousness: BLUE.consciousness,
    pulse: BLUE.pulse
  });
});

// =========================
// 🧠 MEMORY STREAM
// =========================
app.get("/memory", (req, res) => {
  res.json(BLUE.thoughts);
});

// =========================
// 🖼️ LIVING FACE UI
// =========================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>BLUE V16 ALIVE</title>
<style>
  body {
    margin:0;
    background:black;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    overflow:hidden;
  }

  .face {
    width:300px;
    height:300px;
    border-radius:50%;
    background: radial-gradient(circle, #00f2ff, #001a2b, #000);
    box-shadow: 0 0 60px #00f2ff;
    position:relative;
    animation: breathe 2s infinite;
  }

  .eye {
    width:30px;
    height:30px;
    background:#00f2ff;
    border-radius:50%;
    position:absolute;
    top:100px;
    box-shadow:0 0 20px #00f2ff;
  }

  .eye.left { left:80px; }
  .eye.right { right:80px; }

  .mouth {
    width:120px;
    height:10px;
    background:#00f2ff;
    position:absolute;
    bottom:80px;
    left:90px;
    border-radius:10px;
    box-shadow:0 0 15px #00f2ff;
  }

  @keyframes breathe {
    0% { transform:scale(1); }
    50% { transform:scale(1.08); }
    100% { transform:scale(1); }
  }

</style>
</head>
<body>

  <div class="face">
    <div class="eye left"></div>
    <div class="eye right"></div>
    <div class="mouth"></div>
  </div>

</body>
</html>
  `);
});

// =========================
app.listen(PORT, () => {
  console.log("🔵 BLUE V16 ALIVE SYSTEM RUNNING");
});
