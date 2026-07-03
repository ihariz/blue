const express = require("express");
const app = express();

/* =========================
   HOME / DASHBOARD
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v4</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0b1220;
color:white;
}

/* NAV */
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
font-size:20px;
font-weight:bold;
}

nav a{
color:#cbd5e1;
text-decoration:none;
margin-left:15px;
}

nav a:hover{
color:white;
}

/* DASHBOARD */
.container{
padding:30px;
}

.title{
font-size:30px;
color:#60a5fa;
margin-bottom:10px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-top:20px;
}

.card{
background:#111827;
padding:20px;
border-radius:15px;
box-shadow:0 0 15px rgba(59,130,246,0.2);
}

.status{
display:inline-block;
padding:6px 12px;
background:#16a34a;
border-radius:20px;
margin-top:10px;
font-size:12px;
}

/* FOOTER */
footer{
text-align:center;
padding:20px;
color:#64748b;
margin-top:40px;
}
</style>

</head>

<body>

<nav>
<div class="logo">💙 BLUE v4</div>
<div>
<a href="/">Dashboard</a>
<a href="/about">About</a>
<a href="/status">API</a>
</div>
</nav>

<div class="container">

<div class="title">System Dashboard</div>
<p>Welcome to BLUE Community SaaS System 🚀</p>

<div class="grid">

<div class="card">
<h3>Server</h3>
<p>Render Hosting</p>
<div class="status">LIVE</div>
</div>

<div class="card">
<h3>Backend</h3>
<p>Node.js + Express</p>
<div class="status">ACTIVE</div>
</div>

<div class="card">
<h3>Version</h3>
<p>BLUE v4</p>
<div class="status">UPDATED</div>
</div>

<div class="card">
<h3>Time</h3>
<p id="time"></p>
<div class="status">REALTIME</div>
</div>

</div>

</div>

<footer>
BLUE Community © 2026
</footer>

<script>
setInterval(()=>{
document.getElementById("time").innerText = new Date().toLocaleString();
},1000);
</script>

</body>
</html>
  `);
});

/* =========================
   ABOUT PAGE
========================= */
app.get("/about", (req, res) => {
  res.send(`
  <h1 style="color:#60a5fa;text-align:center;margin-top:80px;">
  About BLUE v4
  </h1>
  <p style="text-align:center;color:white;">
  BLUE is a simple SaaS-style Node.js dashboard running on Render.
  </p>
  `);
});

/* =========================
