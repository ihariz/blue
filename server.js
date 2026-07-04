const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   DB CONNECT
========================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

/* =========================
   USER SCHEMA
========================= */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
  const token = req.query.token;

  if (!token) return res.redirect("/");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.redirect("/");
  }
}

/* =========================
   HOME PAGE (SAAS UI)
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BLUE v8 SaaS</title>

<style>
body{
margin:0;
font-family:Arial;
background:radial-gradient(circle at top,#0f172a,#020617);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.card{
background:rgba(17,24,39,0.95);
padding:40px;
border-radius:22px;
width:90%;
max-width:420px;
text-align:center;
box-shadow:0 0 60px rgba(59,130,246,0.25);
}

h1{ color:#60a5fa; }

input{
width:92%;
padding:12px;
margin:8px 0;
border:none;
border-radius:10px;
outline:none;
background:#0f172a;
color:white;
}

button{
width:95%;
padding:12px;
margin-top:10px;
border:none;
border-radius:10px;
background:linear-gradient(90deg,#2563eb,#3b82f6);
color:white;
font-weight:bold;
cursor:pointer;
}

button:hover{
transform:scale(1.02);
}

small{
color:#64748b;
font-size:11px;
}
</style>

</head>

<body>

<div class="card">
<h1>💙 BLUE v8 SAAS</h1>

<form method="POST" action="/register">
<input name="username" placeholder="Username" required />
<input name="password" type="password" placeholder="Password" required />
<button>Register</button>
</form>

<form method="POST" action="/login">
<input name="username" placeholder="Username" required />
<input name="password" type="password" required />
<button>Login</button>
</form>

<small>MongoDB + JWT + SaaS Core</small>
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
    if (exist) return res.send("❌ User already exists");

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hash
    });

    res.redirect("/");

  } catch (err) {
    res.send("❌ Register Error");
  }
});

/* =========================
   LOGIN
========================= */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.send("❌ User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("❌ Wrong password");

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.redirect(`/dashboard?token=${token}`);

  } catch (err) {
    res.send("❌ Login Error");
  }
});

/* =========================
   DASHBOARD (PROTECTED SAAS UI)
========================= */
app.get("/dashboard", auth, (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard</title>

<style>
body{
margin:0;
font-family:Arial;
background:#0f172a;
color:white;
}

nav{
display:flex;
justify-content:space-between;
padding:15px 20px;
background:rgba(17,24,39,0.95);
}

.container{
padding:40px;
text-align:center;
}

.card{
background:rgba(17,24,39,0.95);
padding:35px;
border-radius:18px;
display:inline-block;
box-shadow:0 0 50px rgba(59,130,246,0.25);
}

.badge{
display:inline-block;
margin-top:10px;
padding:6px 14px;
border-radius:20px;
background:linear-gradient(90deg,#16a34a,#22c55e);
font-size:12px;
}
</style>

</head>

<body>

<nav>
<div>💙 BLUE v8 SAAS</div>
<div><a href="/" style="color:#94a3b8;text-decoration:none;">Logout</a></div>
</nav>

<div class="container">
<div class="card">
<h1>Welcome ${req.user.username}</h1>
<p>Role: ${req.user.role}</p>
<div class="badge">ACTIVE SESSION</div>
</div>
</div>

</body>
</html>
  `);
});

/* =========================
   STATUS API
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "8.0",
    status: "LIVE",
    type: "SAAS PRODUCTION"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v8 SAAS running on " + PORT);
});
