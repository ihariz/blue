const express = require("express");
const app = express();

/* =========================
   HOME (LOGIN PAGE POLISHED)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v6.5</title>

<style>
body{
margin:0;
font-family:Arial;
background: radial-gradient(circle at top,#1e3a8a,#0f172a);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
padding:20px;
}

/* CARD */
.box{
background:rgba(17,24,39,0.92);
padding:45px;
border-radius:20px;
text-align:center;
box-shadow:0 0 40px rgba(59,130,246,0.4);
width:100%;
max-width:420px;
backdrop-filter: blur(10px);
}

/* TITLE */
h1{
color:#60a5fa;
margin-bottom:5px;
font-size:34px;
}

.sub{
color:#94a3b8;
margin-bottom:20px;
font-size:14px;
}

/* INPUT */
input{
width:90%;
padding:12px;
margin:8px 0;
border:none;
border-radius:10px;
outline:none;
background:#0f172a;
color:white;
border:1px solid #1f2937;
}

input:focus{
border:1px solid #3b82f6;
}

/* BUTTON */
button{
width:95%;
padding:12px;
margin-top:12px;
border:none;
border-radius:10px;
background:linear-gradient(90deg,#2563eb,#3b82f6);
color:white;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}

button:hover{
transform:scale(1.03);
box-shadow:0 0 20px rgba(59,130,246,0.6);
}

/* FOOTER TEXT */
.small{
color:#64748b;
font-size:12px;
margin-top:15px;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE</h1>
<div class="sub">Secure • Simple • SaaS Style</div>

<form action="/dashboard">
<input type="text" placeholder="Username" required>
<input type="password" placeholder="Password" required>
<button type="submit">LOGIN</button>
</form>

<div class="small">v6.5 Polish UI • Stable System</div>
</div>

</body>
</html>
  `);
});

/* =========================
   DASHBOARD (POLISHED)
========================= */
app.get("/dashboard", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard</title>

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
align-items:center;
padding:15px 25px;
background:rgba(17,24,39,0.95);
backdrop-filter: blur(10px);
position:sticky;
top:0;
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

.card{
background:rgba(17,24,39,0.9);
padding:35px;
border-radius:15px;
display:inline-block;
box-shadow:0 0 30px rgba(59,130,246,0.3);
transition:0.3s;
max-width:400px;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 0 40px rgba(59,130,246,0.6);
}

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
<div>💙 BLUE v6.5</div>
<div>
<a href="/">Logout</a>
</div>
</nav>

<div class="container">
<div class="card">
<h1>Welcome Back</h1>
<p>BLUE Enterprise Dashboard</p>
<div class="badge">LIVE SYSTEM</div>
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
    version: "6.5",
    status: "LIVE",
    ui: "polished",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v6.5 running on " + PORT);
});
