const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BLUE Community</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
font-family:Arial,sans-serif;
background:#0f172a;
color:white;
}

header{
background:#111827;
padding:20px;
text-align:center;
font-size:30px;
font-weight:bold;
color:#60a5fa;
}

.container{
max-width:1100px;
margin:auto;
padding:30px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
}

.card{
background:#1e293b;
border-radius:15px;
padding:20px;
box-shadow:0 0 15px rgba(59,130,246,.35);
}

.card h2{
color:#60a5fa;
margin-bottom:10px;
}

.live{
display:inline-block;
padding:8px 15px;
border-radius:20px;
background:#16a34a;
margin-top:10px;
}

footer{
text-align:center;
padding:30px;
color:#94a3b8;
}

button{
padding:10px 20px;
border:none;
border-radius:10px;
background:#2563eb;
color:white;
cursor:pointer;
margin-top:15px;
}

button:hover{
background:#1d4ed8;
}
</style>
</head>

<body>

<header>
💙 BLUE Community
</header>

<div class="container">

<div class="grid">

<div class="card">
<h2>System</h2>
<p>BLUE Community Server</p>
<div class="live">🟢 LIVE</div>
</div>

<div class="card">
<h2>Platform</h2>
<p>Render Cloud</p>
</div>

<div class="card">
<h2>Backend</h2>
<p>Node.js + Express</p>
</div>

<div class="card">
<h2>Version</h2>
<p>BLUE v2</p>
</div>

</div>

<div style="text-align:center;margin-top:40px;">
<h2 id="clock"></h2>
<button onclick="location.reload()">Refresh</button>
</div>

</div>

<footer>
BLUE Community © 2026
</footer>

<script>
function updateClock(){
document.getElementById("clock").innerHTML =
new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();
</script>

</body>
</html>
`);
});

app.get("/status", (req,res)=>{
res.json({
project:"BLUE",
status:"LIVE",
version:"2.0",
server:"Render"
});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("BLUE v2 running on port " + PORT);
});
