import express from "express";

const app = express();
app.use(express.json());

const users = [];

app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ ok: true, users });
});

app.get("/status", (req, res) => {
  res.json({ system: "BLUE V7.2 BASIC", users: users.length });
});

app.listen(3000, () => console.log("BLUE V7.2 RUNNING"));
