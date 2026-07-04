const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   MONGOOSE CONNECTION
========================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

/* =========================
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v7</title>

<style>
body{
margin:0;
font-family:Arial;
background: radial-gradient(circle at top,#0f172a,#1e3a8a);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.box{
background:rgba(17,24,39,0.92);
padding:40px;
border-radius:20px;
text-align:center;
box-shadow:0 0 40px rgba(59,130,246,0.4);
width:90%;
max-width:420px;
}

h1{
color:#60a5fa;
margin-bottom:10px;
}

p{
color:#94a3b8;
}

.badge{
display:inline-block;
margin-top:12px;
padding:6px 14px;
border-radius:20px;
background:linear-gradient(90deg,#16a34a,#22c55e);
font-size:12px;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE v7</h1>
<p>Production System Ready</p>
<div class="badge">LIVE + MONGODB</div>
</div>

</body>
</html>
  `);
});

/* =========================
   STATUS API
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "7.0",
    status: "LIVE",
    database: "MongoDB",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v7 running on port " + PORT);
});
