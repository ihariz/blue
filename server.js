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
   MONGODB CONNECT
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
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

/* =========================
   JWT AUTH MIDDLEWARE
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
   HOME (SAAS LANDING + LOGIN)
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
background:rgba(17,24,39,0.9);
padding:45px;
border-radius:22px;
width:90%;
max-width:420px;
text-align:center;
box-shadow:0 0 60px rgba(59,130,246,0.25);
}

h1{
color:#60a5fa;
margin-bottom:5px;
}

p{
color:#94a3b8;
font-size:13px;
}

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

.small{
font-size:11px;
color:#64748b;
