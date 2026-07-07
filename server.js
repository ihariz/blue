import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));

const BLUE_CORE = {
  identity: {
    name: "Izzul Hariz",
    system: "BLUE AI Core"
  },

  timeLayer: {
    primary: {
      location: "Selangor, Malaysia",
      timezone: "Asia/Kuala_Lumpur",
      utc: "UTC+8"
    },

    secondary: {
      location: "Germany",
      timezone: "Europe/Berlin",
      utc: "UTC+2"
    }
  },

  status: "ONLINE"
};

app.get("/", (req, res) => {
  res.json({
    blue: BLUE_CORE,
    message: "BLUE Time Identity Core Active"
  });
});

app.get("/time", (req, res) => {
  const nowMalaysia = new Date().toLocaleString(
    "en-MY",
    { timeZone: "Asia/Kuala_Lumpur" }
  );

  const nowGermany = new Date().toLocaleString(
    "de-DE",
    { timeZone: "Europe/Berlin" }
  );

  res.json({
    malaysia: nowMalaysia,
    germany: nowGermany
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BLUE Core running on port ${PORT}`);
});
