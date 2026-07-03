, (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Blue Community</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #020617, #0f172a, #1e3a8a);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      text-align: center;
      background: rgba(255,255,255,0.06);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 0 30px rgba(59,130,246,0.6);
      backdrop-filter: blur(10px);
      width: 90%;
      max-width: 400px;
    }

    h1 {
      font-size: 32px;
      color: #60a5fa;
      margin-bottom: 10px;
    }

    p {
      color: #cbd5e1;
      margin-bottom: 20px;
    }

    .badge {
      display: inline-block;
      padding: 8px 16px;
      background: #2563eb;
      border-radius: 999px;
      font-size: 12px;
      margin-bottom: 20px;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      background: #3b82f6;
      color: white;
      border-radius: 10px;
      text-decoration: none;
      margin-top: 10px;
      transition: 0.3s;
    }

    .btn:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="badge">💙 BLUE LIVE SYSTEM</div>
    <h1>Blue Community</h1>
    <p>Modern Node.js App Running on Render 🚀</p>

    <a class="btn" href="/status">Check Status</a>
  </div>
</body>
</html>
  `);
});app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    status: "LIVE",
    server: "Render",
    time: new Date()
  });
});
