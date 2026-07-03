const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("💙 BLUE IS LIVE 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE running");
});
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="background:#0a0f2c;color:white;text-align:center;padding-top:100px;">
        <h1 style="color:#60a5fa;">💙 BLUE COMMUNITY</h1>
        <p>UPDATED SUCCESS 🚀</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE updated");
});
