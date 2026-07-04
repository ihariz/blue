import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// =========================
// DATABASE
// =========================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

// =========================
// USER MODEL
// =========================
const User = mongoose.model("User", {
  email: String,
  password: String
});

// =========================
// REGISTER
// =========================
app.post("/api/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);

  const user = await User.create({
    email:req.body.email,
    password:hash
  });

  res.json(user);
});

// =========================
// LOGIN
// =========================
app.post("/api/login", async (req,res)=>{
  const user = await User.findOne({ email:req.body.email });

  if(!user) return res.status(404).send("USER NOT FOUND");

  const ok = await bcrypt.compare(req.body.password, user.password);

  if(!ok) return res.status(403).send("WRONG PASSWORD");

  const token = jwt.sign(
    { id:user._id },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  );

  res.json({ token });
});

// =========================
// AUTH MIDDLEWARE
// =========================
function auth(req,res,next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch{
    res.status(401).send("NO ACCESS");
  }
}

// =========================
// DASHBOARD
// =========================
app.get("/api/dashboard", auth, async (req,res)=>{
  const user = await User.findById(req.user.id);

  res.json({
    system:"BLUE SAAS PRODUCTION",
    user:user.email,
    status:"ACTIVE"
  });
});

// =========================
// START SERVER
// =========================
app.listen(PORT,()=>{
  console.log("BLUE SAAS LIVE ON PORT", PORT);
});
