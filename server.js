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
<title>BLUE Community</title>

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
align-items:center;
}

nav a{
color:white;
text-decoration:none;
margin:0 10px;
}

.logo{
color:#60a5fa;
font-weight:bold;
font-size:20px;
}

.container{
text-align:center;
padding:80px 20px;
}

h1{
font-size:40px;
color:#60a5fa;
}

.btn{
display:inline-block;
margin-top:20px;
padding:10px 20px;
background:#2563eb;
border-radius:10px;
color:white;
text-decoration:none;
}

footer{
text-align:center;
padding:20px;
color:#94a3b8;
margin-top:50px;
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

<div class="container">
<h1>Welcome to BLUE v3</h1>
<p>Simple • Fast • Live on Render 🚀</p>
<a class="btn" href="/status">Check System</a>
</div>

<footer>
BLUE Community © 2026
</footer>

</body>
</html>
  `);
});

/* =========================
   ABOUT PAGE
========================= */
app.get("/about", (req, res) => {
  res.send(`
  <h1 style="color:#60a5fa;text-align:center;margin-top:100px;">
  About BLUE
  </h1>
  <p style="text-align:center;color:white;">
  BLUE Community is a simple Node.js project running on Render.
  </p>
  `);
});

/* =========================
   STATUS API
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "3.0",
    status: "LIVE",
    server: "Render"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v3 running on port " + PORT);
});
