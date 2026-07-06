require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Performance
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100
  })
);

// BLUE Language Engine
const languages = [
  {
    code: "en",
    name: "English"
  },
  {
    code: "ne",
    name: "Nepali"
  },
  {
    code: "ms",
    name: "Bahasa Melayu"
  },
  {
    code: "id",
    name: "Bahasa Indonesia"
  },
  {
    code: "ban",
    name: "Bahasa Bali"
  },
  {
    code: "sa",
    name: "Sanskrit"
  },
  {
    code: "zh-CN",
    name: "Chinese Simplified"
  },
  {
    code: "zh-TW",
    name: "Chinese Traditional"
  },
  {
    code: "pt",
    name: "Portuguese"
  },
  {
    code: "pt-BR",
    name: "Brazilian Portuguese"
  }
];


// BLUE Health Status
app.get("/", (req, res) => {
  res.json({
    system: "BLUE AI",
    version: "v32",
    status: "ONLINE",
    mode: "Full SaaS AI Platform",
    languages: languages.length,
    timestamp: new Date().toISOString()
  });
});


// Language API
app.get("/api/languages", (req, res) => {
  res.json({
    supported: languages
  });
});


// AI Core Placeholder
app.post("/api/chat", (req, res) => {

  const { message, language } = req.body;

  res.json({
    system: "BLUE AI",
    language: language || "en",
    input: message,
    response: "BLUE AI multilingual core is active."
  });

});


// Start Server
app.listen(PORT, () => {
  console.log(
    `BLUE v32 running on port ${PORT}`
  );
});
