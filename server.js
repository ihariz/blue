const express = require("express");
const app = express();

/* =========================
   HOME PAGE (UI DASHBOARD)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE Community</title>

<style>
body{
margin:0;
font-family:Arial;
background:linear-gradient(135deg,#0f172a,#1e3a8a);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.card{
background:rgba(17,24,39,0.9);
padding:40px;
border-radius:20px;
text-align:center;
box-shadow:0 0 25px rgba(59,130,246,0.5);
width:90%;
max-width:400px;
}

h1{
color:#60a5fa;
margin-bottom:10px;
font-size:32px;
}

.status{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:#16a34a;
font-size:12px;
}

.info{
margin-top:15px;
color:#cbd5e1;
font-size:14px;
}

.btn{
display:inline-block;
margin-top:20px;
padding:10px 20px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:10px;
}

.btn:hover{
background:#1d4ed8;
}
</style>

</head>

<body>

<div class="card">
<h1>💙 BLUE SYSTEM</h1>
<p>Latest Stable Version Running</p>

<div class="status">🟢 ONLINE</div>

<div class="info">
Node.js + Express • Render Cloud • Stable Build
</div>

<a class="btn" href="/status">Check API</a>
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
    version: "latest-stable",
    status: "LIVE",
    server: "Render",
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

/*
