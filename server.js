const express = require("express");
const cors = require("cors");

const brain = require("./brain");
const security = require("./security");
const autonomous = require("./autonomous");

const app = express();
app.use(cors());
app.use(express.json());

// 🔷 HEARTBEAT (Blue sentiasa hidup)
setInterval(() => {
  autonomous.run();
}, 4000);

// MAIN API
app.post("/api/blue", (req, res) => {
  const { message, ip } = req.body;

  if (!security(ip)) {
    return res.json({
      reply: "🛡️ BLUE DEFENDER: ACCESS BLOCKED"
    });
  }

  const reply = brain(message);

  res.json({
    reply,
    mode: "AUTONOMOUS ACTIVE",
    status: "BLUE ONLINE"
  });
});

app.listen(3000, () => {
  console.log("🔷 BLUE AUTONOMOUS SYSTEM ONLINE");
});
