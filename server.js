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
const VERSION = "BLUE v32.1.0";

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

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));


let languages = [];

try {
  const languageFile = path.join(
    __dirname,
    "data",
    "languages.json"
  );

  languages = JSON.parse(
    fs.readFileSync(languageFile, "utf8")
  ).languages;

} catch (error) {

  languages = [
    "English",
    "Bahasa Melayu",
    "Indonesia",
    "中文",
    "日本語"
  ];

}


app.get("/", (req, res) => {

  const indexFile = path.join(
    publicPath,
    "index.html"
  );

  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.send(`
      <h1>BLUE AI CORE ONLINE</h1>
      <p>${VERSION}</p>
      <p>Dashboard file missing
