const express = require("express");
const app = express();

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v5.3</title>

<style>
body{
margin:0;
font-family:Arial;
background: radial-gradient(circle at top,#1e3a8a,#0f172a);
color:white;
}

/* NAV */
nav{
display:flex;
justify-content:space-between;
padding:15px 25px;
background:rgba(17,24,39,0.9);
backdrop-filter: blur(10px);
position:sticky;
top:0;
}

.logo{
color:#60a5fa;
font-weight:bold;
}

nav a{
color:#cbd5e1;
margin-left:15px;
text-decoration:none;
}

nav a:hover{
color:white;
}

/* HERO */
.hero{
text-align:center;
padding:80px 20px;
}

.hero h1{
font-size:42px;
color:#60a5fa;
text-shadow:0 0 15px rgba(96,165,250,0.7);
animation: glow 2s infinite alternate;
}

@keyframes glow{
from{ text-shadow:0 0 10px rgba(96,165,250,0.4); }
to{ text-shadow:0 0 25px rgba(96,165,250,0.9); }
}

.hero p{
color:#94a3b8;
}

/* CARDS */
.container{
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:20px;
padding:20px;
}

.card{
background:rgba(17,24,39,0.9);
padding:25px;
border-radius:15px;
width:250px;
text-align:center;
transition:0.3s;
box-shadow:0 0 20px rgba(59,130,246,0.2);
}

.card:hover{
transform:translateY(-8px);
box-shadow:0 0 35px rgba(59,130,246,0.6);
}

.badge{
display:inline-block;
margin-top:10px;
padding:6px 12px;
border-radius:20px;
background:linear-gradient(90deg,#16a34a,#22c55e);
font-size:12px;
}
</style>

</head>

<body>

<nav>
<div class="logo">💙 BLUE v5.3</div>
<div>
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/status">Status</a>
</div>
</nav>

<div class="hero">
<h1>BLUE SYSTEM</h1>
<p>Simple • Clean • Premium UI</p>
</div>

<div class="container">

<div class="card">
<h3>Server</h3>
<p>Stable on Render</p>
<div class="badge">LIVE</div>
</div>

<div class="card">
<h3>Performance</h3>
<p>Lightweight System</p>
<div class="badge">FAST</div>
</div>

<div class="card">
<h3>Status</h3>
<p>All systems running</p>
<div class="badge">OK</div>
</div>

</div>

</body>
</html>
  `);
});

/* =========================
   ABOUT
========================= */
app.get("/about", (req, res) => {
  res.send(`
  <div style="text-align:center;margin-top:80px;font-family:Arial;">
    <h1 style="color:#60a5fa;">About BLUE</h1>
    <p style="color:#94a3b8;">BLUE v5.3 - UI improved version</p>
  </div>
  `);
});

/* =========================
   STATUS
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "5.3",
    status: "LIVE",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v5.3 running on " + PORT);
});
