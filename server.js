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
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);

/* =========================
   JWT AUTH MIDDLEWARE
========================= */
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("No token");

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send(`
    <h1>💙 BLUE v7.3</h1>

    <form method="POST" action="/register">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" required />
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
   REGISTER
========================= */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exist = await User.findOne({ username });
  if (exist) return res.send("User exists");

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hash,
    role: "user"
  });

  res.send("User Registered");
});

/* =========================
   LOGIN (JWT)
========================= */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Wrong password");

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login success",
    token
  });
});

/* =========================
   DASHBOARD (PROTECTED)
========================= */
app.get("/dashboard", auth, (req, res) => {
  res.send(`
    <h1>💙 DASHBOARD</h1>
    <p>User: ${req.user.username}</p>
    <p>Role: ${req.user.role}</p>
  `);
});

/* =========================
   ADMIN ROUTE (ROLE BASED)
========================= */
app.get("/admin", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.send("Access denied");
  }

  res.send("💙 Admin Panel");
});

/* =========================
   STATUS
========================= */
app.get("/status", (req, res) => {
  res.json({
    project: "BLUE",
    version: "7.3",
    status: "LIVE",
    auth: "JWT ACTIVE"
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE v7.3 running on " + PORT);
});
