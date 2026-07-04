import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const users = [];
const SECRET = "blue_secret";

app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const token = jwt.sign(req.body, SECRET);
  res.json({ token });
});

app.get("/dashboard", (req, res) => {
  res.json({ system: "BLUE V7.3 DASHBOARD ACTIVE" });
});

app.listen(3000);
