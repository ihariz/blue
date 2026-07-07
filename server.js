import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

const BLUE_PROFILE = {
  name: "BLUE AI",
  version: "Full Vision Core 1.0",
  status: "online",
  system: "clean modular architecture",
  modules: [
    "AI Core",
    "Language Engine",
    "Unicode Character Engine",
    "Keyboard Engine",
    "Font Engine",
    "Time Layer",
    "Memory Layer",
    "Dashboard Layer"
  ]
};

app.get("/", (req, res) => {
  res.json({
    message: "BLUE AI Core Running",
    profile: BLUE_PROFILE
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    project: "BLUE AI",
    uptime: process.uptime()
  });
});

app.get("/api/profile", (req, res) => {
  res.json(BLUE_PROFILE);
});

app.listen(PORT, () => {
  console.log(`BLUE AI running on port ${PORT}`);
});
