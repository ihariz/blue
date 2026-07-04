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
<title>BLUE v5.2</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0f172a;
color:white;
}

/* NAVBAR */
nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 25px;
background:#111827;
position:sticky;
top:0;
}

.logo{
color:#60a5fa;
font-weight:bold;
font-size:20px;
}

nav a{
color:#cbd5e1;
text-decoration:none;
margin-left:15px;
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
color:#60a5fa;
font-size:40px;
text-shadow:0 0 10px rgba(96,165,250,0.6);
}

.hero p{
color:#94a3b8;
}

/* CARD */
.card{
background:#111827;
margin:20px auto;
padding:20px;
max-width:400px;
border-radius:15px;
box-shadow:0 0 20px rgba(59,130,246,0.3);
transition:0.3s;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 0 30px rgba(59,130,246,0.6);
}

/* BADGE */
.badge{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:linear-gradient(90deg,#16a34a,#22c55e);
font-size:12px;
}
</style>

</head>

<body>

<nav>
<div class="logo">💙 BLUE</div>
<div>
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/status">Status</a>
</div>
</nav>

<div class="hero">
<h1>BLUE v5.2</h1>
<p>Simple • Clean • SaaS Style</p>
</div>

<div class="card">
<h3>System Status</h3>
<p>Server running stable on Render</p>
<div class="badge">🟢 LIVE</div>
</div>

</body>
</html>
  `);
});

/* =========================
   ABOUT PAGE
========================= */
app.get("/about", (req, res) => {
  res.send(`
  <div style="text-align:center;margin-top:80px;font-family:Arial;">
    <h1 style="color:#60a5fa;">About BLUE</h1>
    <p style="color:#94a3b8;">BLUE is a simple SaaS-style Node.js project.</p>
  </div>
  `);
});

/* =========================
   STATUS API
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "5.2",
    status: "LIVE",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v5.2 running on " + PORT);
});
