import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = "BLUE v32.0.0";

const startTime = new Date();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(express.static("public"));


let languages = [];

try {
  languages = JSON.parse(
    fs.readFileSync("./data/languages.json", "utf8")
  ).languages;
} catch {
  languages = [
    "English",
    "Bahasa Melayu",
    "Indonesia",
    "中文",
    "日本語"
  ];
}


app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});


app.get("/health", (req,res)=>{
  res.json({
    status:"online",
    system:"BLUE CORE",
    version:VERSION,
    uptime:process.uptime(),
    time:new Date()
  });
});


app.get("/api/status",(req,res)=>{
  res.json({
    blue:"active",
    version:VERSION,
    mode:"AI Dashboard",
    server:"Render",
    started:startTime,
    memory:process.memoryUsage()
  });
});


app.get("/api/version",(req,res)=>{
  res.json({
    name:"BLUE",
    version:VERSION,
    release:"Final Core"
  });
});


app.get("/api/languages",(req,res)=>{
  res.json({
    engine:"BLUE Language Core",
    total:languages.length,
    languages
  });
});


app.get("/api/time",(req,res)=>{
  res.json({
    utc:new Date().toISOString()
  });
});


app.use((req,res)=>{
  res.status(404).json({
    error:"BLUE route not found"
  });
});


app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({
    error:"BLUE system error"
  });
});


app.listen(PORT,()=>{
  console.log(`
=========================
 BLUE AI CORE ONLINE
 VERSION ${VERSION}
 PORT ${PORT}
=========================
`);
});
