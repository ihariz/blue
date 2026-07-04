const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   SESSION SYSTEM
========================= */
app.use(session({
  secret: "blue_secret_key",
  resave: false,
  saveUninitialized: false
}));

/* =========================
   MONGODB
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
   HOME PAGE
========================= */
app.get("/", (req, res) => {
  res.send(`
  <h1>💙 BLUE v7.2</h1>

  <form method="POST" action="/register">
    <input name="username" placeholder="Username" required />
    <input name="password" type="password" placeholder="Password" required />
    <button>Register</button>
  </form>

  <form method="POST" action="/login">
    <input name="username" placeholder="Username" required />
    <input name="password" type="password" placeholder="Password" required />
    <button>Login</button>
  </form>
  `);
});

/* =========================
   REGISTER
========================= */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exist = await User.findOne({ username });
  if (exist) return res.send("User already exists");

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hash
  });

  res.redirect("/");
});

/* =========================
   LOGIN (SESSION CREATE)
========================= */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Wrong password");

  // CREATE SESSION
  req.session.user = user.username;

  res.redirect("/dashboard");
