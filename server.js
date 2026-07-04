const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   SESSION (FIXED SAFE MODE)
========================= */
app.use(session({
  secret: "blue_secret_key_2026",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  }
}));

/* =========================
   MONGODB CONNECT (SAFE)
========================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err.message));

/* =========================
   USER MODEL
========================= */
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send(`
    <h1>💙 BLUE v7.2 STABLE</h1>

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
  `);
});

/* =========================
   REGISTER (SAFE)
========================= */
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const exist = await User.findOne({ username });
    if (exist) return res.send("User exists");

    const hash = await bcrypt.hash(password, 10);

    await User.create({ username, password: hash });

    res.redirect("/");
  } catch (err) {
    res.send("Register error");
  }
});

/* =========================
   LOGIN (SAFE SESSION)
========================= */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Wrong password");

    req.session.user = user.username;

    res.redirect("/dashboard");
  } catch (err) {
    res.send("Login error");
  }
});

/* =========================
   AUTH CHECK
========================= */
function auth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

/* =========================
   DASHBOARD
========================= */
app.get("/dashboard", auth, (req, res) => {
  res.send(`
    <h1>💙 DASHBOARD</h1>
    <p>Welcome ${req.session.user}</p>
    <a href="/logout">Logout</a>
  `);
});

/* =========================
   LOGOUT
========================= */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* =========================
   STATUS
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "7.2-stable",
    status: "LIVE"
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v7.2 STABLE running on " + PORT);
});
