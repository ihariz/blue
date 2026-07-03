const express = require("express");
const app = express();

/* =========================
   HOME PAGE
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0f172a;
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.card{
background:#111827;
padding:40px;
border-radius:15px;
text-align:center;
box-shadow:0 0 25px rgba(59,130,246,0.4);
max-width:350px;
width:90%;
}

h1{
color:#60a5fa;
margin-bottom:10px;
}

.status{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:#16a34a;
font-size:12px;
}

small{
color:#94a3b8;
}
</style>

</head>

<body>

<div class="card">
<h1>💙 BLUE SYSTEM</h1>
<p>Stable Server Running</p>
<div class="status">ONLINE</div>
<br><br>
<small>Node.js + Express • Render Hosting</small>
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
    status: "LIVE",
    version: "stable-core",
    server: "render",
    uptime: process.uptime()
  });
});

/* =========================
   HEALTH CHECK (OPTIONAL)
========================= */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE stable running on port " + PORT);
});
