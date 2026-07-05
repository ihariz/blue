import express from "express";

const app = express();

/* =========================
   LIVE CHECK ROOT
========================= */
app.get("/", (req, res) => {
  res.json({
    system: "BLUE LIVE",
    status: "ONLINE",
    message: "BLUE is running successfully on Render",
    time: new Date().toISOString()
  });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    system: "BLUE LIVE",
    uptime: process.uptime()
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE LIVE SERVER RUNNING");
});
