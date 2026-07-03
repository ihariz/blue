, (req, res) => {
  res.send(`
    <html>
      <head>
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
            text-align:center;
            padding:40px;
            border-radius:20px;
            background:#1e293b;
            box-shadow:0 0 25px #3b82f6;
          }
          h1{
            color:#60a5fa;
            margin:0;
            font-size:40px;
          }
          p{
            color:#cbd5e1;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>💙 BLUE LIVE</h1>
          <p>System Running Smooth 🚀</p>
        </div>
      </body>
    </html>
  `);
});
