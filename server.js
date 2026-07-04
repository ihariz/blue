const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   MONGODB CONNECT
========================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

/* =========================
   USER MODEL
========================= */
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

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
<title>BLUE v7.1</title>
<style>
body{
margin:0;
font-family:Arial;
background:linear-gradient(135deg,#0f172a,#1e3a8a);
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
width:90%;
max-width:420px;
text-align:center;
box-shadow:0 0 40px rgba(59,130,246,0.3);
}

input{
width:90%;
padding:12px;
margin:8px 0;
border-radius:10px;
border:none;
outline:none;
}

button{
width:95%;
padding:12px;
margin-top:10px;
border:none;
border-radius:10px;
background:#3b82f6;
color:white;
font-weight:bold;
cursor:pointer;
}

button:hover{
background:#2563eb;
}
</style>
</head>
<body>

<div class="box">
<h2>💙 BLUE LOGIN</h2>

<form method="POST" action="/register">
<input name="username" placeholder="Username" required />
<input name="password" type="password" placeholder="Password" required />
<button type="submit">Register</button>
</form>

<br>

<form method="POST" action="/login">
<input name="username" placeholder="Username" required />
<input name="password" type="password" placeholder="Password" required />
<button type="submit">Login</button>
</form>

</div>

</body>
</html>
  `);
});

/* =========================
   REGISTER
========================= */
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const exist = await User.findOne({ username });
    if (exist) return res.send("User already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hash
    });

    await user.save();

    res.send("✅ User Registered");

  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});

/* =========================
   LOGIN
========================= */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send("Wrong password");

    res.send("✅ Login Success");

  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});

/* =========================
   STATUS API
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "7.1",
    status: "LIVE",
    database: "MongoDB"
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v7.1 running on " + PORT);
});
