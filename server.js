import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// =========================
// DATABASE
// =========================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB CONNECTED"));

// =========================
// USER MODEL
// =========================
const User = mongoose.model("User", {
  email: String,
  password: String
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
    res.status(401).json({ error:"NO ACCESS" });
  }
}

// =========================
// REGISTER
// =========================
app.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);

  const user = await User.create({
    email:req.body.email,
    password:hash
  });

  res.json({ status:"REGISTERED", user });
});

// =========================
// LOGIN
// =========================
app.post("/login", async (req,res)=>{
  const user = await User.findOne({ email:req.body.email });

  if(!user) return res.status(404).json({ error:"NOT FOUND" });

  const ok = await bcrypt.compare(req.body.password, user.password);

  if(!ok) return res.status(403).json({ error:"WRONG PASSWORD" });

  const token = jwt.sign(
    { id:user._id, email:user.email },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  );

  res.json({ token });
});

// =========================
// DASHBOARD (WINNING CORE)
// =========================
app.get("/dashboard", auth, async (req,res)=>{
  const user = await User.findById(req.user.id);

  res.json({
    system:"🔵 BLUE MAX CORE WINNING",
    user:user.email,
    status:"ACTIVE",
    level:"V10 FINAL"
  });
});

// =========================
// AI ENDPOINT (SIMPLE BUT POWERFUL)
// =========================
app.post("/ai", auth, (req,res)=>{
  const input = req.body.text;

  res.json({
    input,
    output:`BLUE AI processed: ${input}`,
    confidence:0.92
  });
});

// =========================
app.listen(PORT, ()=>{
  console.log("🔵 BLUE MAX CORE RUNNING ON", PORT);
});
