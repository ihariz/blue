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
app.use(express.json());
app.use(morgan("combined"));

const BLUE = {
  name: "BLUE",
  version: "v9.0",
  mode: "6G Simulation",
  status: "ONLINE",
  integrity: true,
  modules: {
    guardian: true,
    reportCenter: true,
    investigation: "simulation",
    insurance: "simulation",
    piggyBank: "simulation",
    businessFund: "simulation",
    trading: "THB/SGD Simulation",
    quranKnowledge: true,
    languageEngine: true,
    memoryLayer: "simulation"
  }
};

app.get("/", (req, res) => {
  res.json({
    message: "BLUE v9.0 6G Simulation Server",
    blue: BLUE
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/status", (req, res) => {
  res.json(BLUE);
});

app.listen(PORT, () => {
  console.log(`BLUE v9.0 running on port ${PORT}`);
});
