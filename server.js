const express = require("express");
const app = express();

/* =========================
   HOME PAGE (LOGIN ENTRY)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v6</title>

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
}

.box{
background:rgba(17,24,39,0.9);
padding:40px;
border-radius:20px;
text-align:center;
box-shadow:0 0 30px rgba(59,130,246,0.4);
width:90%;
max-width:400px;
}

h1{
color:#60a5fa;
margin-bottom:10px;
}

input{
width:90%;
padding:10px;
margin:8px 0;
border:none;
border-radius:10px;
outline:none;
}

button{
width:95%;
padding:10px;
margin-top:10px;
border:none;
border-radius:10px;
background:#2563eb;
color:white;
cursor:pointer;
}

button:hover{
background:#1d4ed8;
}

.small{
color:#94a3b8;
font-size:12px;
margin-top:10px;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE v6</h1>
<p>Login System (Demo)</p>

<form action="/dashboard">
<input type="text" placeholder="Username" required>
<input type="password" placeholder="Password" required>
<button type="submit">Login</button>
</form>

<div class="small">System Stable • No Database Yet</div>
</div>

</body>
</html>
  `);
});

/* =========================
   DASHBOARD (AFTER LOGIN)
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

nav{
background:#111827;
padding:15px;
display:flex;
justify-content:space-between;
}

nav a{
color:#cbd5e1;
margin-left:15px;
text-decoration:none;
}

.container{
padding:40px;
text-align:center;
}

.card{
background:#111827;
padding:30px;
border-radius:15px;
display:inline-block;
box-shadow:0 0 20px rgba(59,130,246,0.3);
}
</style>

</head>

<body>

<nav>
<div>💙 BLUE v6</div>
<div>
<a href="/">Logout</a>
</div>
</nav>

<div class="container">
<div class="card">
<h1>Welcome to BLUE Dashboard</h1>
<p>Status: LIVE SYSTEM</p>
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
    version: "6.0",
    status: "LIVE",
    feature: "login-demo"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v6 running on " + PORT);
});
