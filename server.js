app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Blue</title>
      </head>
      <body style="background:#0f172a;color:white;text-align:center;padding-top:100px;">
        <h1 style="color:#60a5fa;">💙 BLUE LIVE</h1>
        <p>System Running OK 🚀</p>
      </body>
    </html>
  `);
});
