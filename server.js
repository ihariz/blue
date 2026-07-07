import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = "BLUE v32.1.0";
const INSTANCE_ID = uuidv4();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startTime = new Date();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));


const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));


let languages = [];

try {

  const langPath = path.join(
    __dirname,
    "data",
    "languages.json"
  );

  languages
