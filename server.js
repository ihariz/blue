const express = require("express");
const app = express();

/* HOME */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE Lovely</title>

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

.card{
background:rgba(17,24,39,0.85);
padding:45px;
border-radius:20px;
text-align:center;
box-shadow:0 0 30px rgba(59,130,246,0.5);
backdrop-filter: blur(10px);
max-width:420px;
}

h1{
color:#60a5fa;
font-size:34px;
}

p{
color:#cbd5e1;
}

.badge{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:#16a34a;
font-size:12px;
}

small{
display:block;
margin-top:15px;
color:#94a3b8;
}
</style>

</head>

<body>

<div class="card">
<h1>💙 BLUE LOVELY</h1>
<p>Simple • Stable • Beautiful</p>
<div class="badge">🟢 LIVE SYSTEM</div>
<small>Powered by Node.js + Render</small>
</div>

</body>
</html>
  `);
});

/* STATUS */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    status: "LIVE",
    level: "lovely"
  });
});

/* SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE running on " + PORT);
});
