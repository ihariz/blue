const express = require("express");
const app = express();

/* =========================
   HOME (LOGIN UI IMPROVED)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v6.6</title>

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
padding:15px;
}

/* CARD */
.box{
background:rgba(17,24,39,0.92);
padding:42px;
border-radius:22px;
text-align:center;
box-shadow:0 0 45px rgba(59,130,246,0.35);
width:100%;
max-width:420px;
backdrop-filter: blur(12px);
transition:0.3s;
}

.box:hover{
transform:scale(1.01);
}

/* TITLE */
h1{
color:#60a5fa;
font-size:36px;
margin-bottom:5px;
text-shadow:0 0 15px rgba(96,165,250,0.5);
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
margin:8px 0;
border-radius:10px;
border:1px solid #1f2937;
background:#0f172a;
color:white;
outline:none;
transition:0.3s;
}

input:focus{
border:1px solid #3b82f6;
box-shadow:0 0 10px rgba(59,130,246,0.3);
}

/* BUTTON */
button{
width:96%;
padding:12px;
margin-top:12px;
border:none;
border-radius:12px;
background:linear-gradient(90deg,#2563eb,#3b82f6);
color:white;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}

button:hover{
transform:scale(1.03);
box-shadow:0 0 25px rgba(59,130,246,0.6);
}

/* FOOTER */
.small{
color:#64748b;
font-size:12px;
margin-top:14px;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE</h1>
<div class="sub">Secure • Stable • Clean UI</div>

<form action="/dashboard">
<input type="text" placeholder="Username" required>
<input type="password" placeholder="Password" required>
<button type="submit">ENTER</button>
</form>

<div class="small">v6.6 Polish • Stable Build</div>
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

/* NAV */
nav{
display:flex;
justify-content:space-between;
padding:15px 20px;
background:rgba(17,24,39,0.95);
position:sticky;
top:0;
backdrop-filter: blur(10px);
}

nav a{
color:#cbd5e1;
text-decoration:none;
margin-left:15px;
}

nav a:hover{
color:white;
}

/* CONTENT */
.container{
padding:40px;
text-align:center;
}

/* CARD */
.card{
background:rgba(17,24,39,0.9);
padding:35px;
border-radius:18px;
display:inline-block;
box-shadow:0 0 35px rgba(59,130,246,0.25);
transition:0.3s;
}

.card:hover{
transform:translateY(-6px);
box-shadow:0 0 45px rgba(59,130,246,0.6);
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
<div>💙 BLUE v6.6</div>
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
    version: "6.6",
    status: "LIVE",
    level: "polish-final",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v6.6 running on " + PORT);
});
