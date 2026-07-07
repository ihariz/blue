import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = "BLUE v32.1 Active";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startTime = new Date();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));


const publicFolder = path.join(__dirname, "public");

app.use(express.static(publicFolder));


let languages = [];

try {

  const file = path.join(
    __dirname,
    "data",
    "languages.json"
  );

  languages = JSON.parse(
    fs.readFileSync(file, "utf8")
  ).languages;

} catch {

  languages = [
    "English",
    "Bahasa Melayu",
    "Indonesia",
    "中文",
    "日本語",
    "한국어"
  ];

}


app.get("/", (req,res)=>{

  const dashboard =
    path.join(publicFolder,"index.html");

  if(fs.existsSync(dashboard)){
    res.sendFile(dashboard);
  }
  else {
    res.send(`
    <html>
    <body>
    <h1>BLUE AI CORE ONLINE</h1>
    <p>${VERSION}</p>
    <p>Dashboard waiting</p>
    </body>
    </html>
    `);
  }

});


app.get("/health",(req,res)=>{

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
    status:"running",
    version:VERSION,
    server:"Render",
    started:startTime,
    node:
