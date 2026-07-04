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
<title>BLUE v6.7</title>

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
padding:16px;
}

/* CARD */
.box{
background:rgba(17,24,39,0.92);
padding:40px;
border-radius:22px;
text-align:center;
box-shadow:0 0 40px rgba(59,130,246,0.30);
width:100%;
max-width:420px;
backdrop-filter: blur(12px);
transition:0.3s ease;
}

.box:hover{
transform:translateY(-3px);
box-shadow:0 0 50px rgba(59,130,246,0.45);
}

/* TITLE */
h1{
color:#60a5fa;
font-size:36px;
margin-bottom:6px;
letter-spacing:1px;
}

.sub{
color:#94a3b8;
font-size:13px;
margin-bottom:18px;
}

/* INPUT */
input{
width:92%;
padding:12px;
margin:7px 0;
border-radius:10px;
border:1px solid #1f2937;
background:#0f172a;
color:white;
outline:none;
transition:0.25s;
}

input:focus{
border:1px solid #3b82f6;
box-shadow:0 0 12px rgba(59,130,246,0.25);
}

/* BUTTON */
button{
width:96%;
padding:12px;
margin-top:10px;
border:none;
border-radius:12px;
background:linear-gradient(90deg,#2563eb,#3b82f6);
color:white;
font-weight:bold;
cursor:pointer;
transition:0.25s ease;
letter-spacing:0.5px;
}

button:hover{
transform:scale(1.02);
box-shadow:0 0 22px rgba(59,130,246,0.55);
}

/* FOOTER */
.small{
color:#64748b;
font-size:11px;
margin-top:14px;
opacity:0.9;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE</h1>
<div class="sub">Secure • Stable • Minimal SaaS</div>

<form action="/dashboard">
<input type="text" placeholder="Username" required>
<input type="password" placeholder="Password" required>
<button type="submit">ENTER</button>
</form>

<div class="small">v6.7 Micro Polish • Stable Build</div>
</div>

</body>
</html>
  `);
});

/* =========================
   DASHBOARD
========================= */
app.get("/dashboard", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE Dashboard</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0f172a;
color:white;
}

nav{
display:flex;
justify-content:space-between;
padding:14px 20px;
background:rgba(17,24,39,0.95);
backdrop-filter: blur(10px);
position:sticky;
top:0;
}

nav a{
color:#cbd5e1;
text-decoration:none;
margin-left:15px;
font-size:14px;
}

nav a:hover{
color:white;
}

/* CONTENT */
.container{
padding:40px;
text-align:center;
}

.card{
background:rgba(17,24,39,0.9);
padding:32px;
border-radius:18px;
display:inline-block;
box-shadow:0 0 35px rgba(59,130,246,0.25);
transition:0.3s ease;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 0 45px rgba(59,130,246,0.5);
}

.badge{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:linear-gradient(90deg,#16a34a,#22c55e);
font-size:12px;
letter-spacing:0.5px;
}
</style>

</head>

<body>

<nav>
<div>💙 BLUE v6.7</div>
<div>
<a href="/">Logout</a>
</div>
</nav>

<div class="container">
<div class="card">
<h1>Welcome Back</h1>
<p>BLUE Enterprise System</p>
<div class="badge">LIVE STABLE</div>
</div>
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
    version: "6.7",
    status: "LIVE",
    level: "micro-polish",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v6.7 running on " + PORT);
});
