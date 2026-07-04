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
<title>BLUE</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0f172a;
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.box{
background:#111827;
padding:40px;
border-radius:15px;
text-align:center;
box-shadow:0 0 25px rgba(59,130,246,0.5);
}

h1{
color:#60a5fa;
}
</style>

</head>

<body>

<div class="box">
<h1>💙 BLUE LIVE</h1>
<p>System Stable Running</p>
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
    version: "stable-clean"
  });
});

/* SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE running on " + PORT);
});
