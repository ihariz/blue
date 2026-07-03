const express = require("express");
const app = express();

app.get("/"), (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Blue Live</title>
        <style>
          body {
            margin: 0;
            font-family: Arial;
            background: linear-gradient(135deg, #0a0f2c, #1e3a8a);
            color: white;
            text-align: center;
            padding-top: 120px;
          }
          .card {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 20px;
            width: 300px;
            margin: auto;
            box-shadow: 0 0 20px #3b82f6;
          }
          h1 {
            color: #60a5fa;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>💙 BLUE LIVE</h1>
          <p>Running on Render 🚀</p>
        </div>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Blue UI running");
});
