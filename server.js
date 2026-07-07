import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import os from "os";
import crypto from "crypto";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);


// Security Layer

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false
}));


// Performance Layer

app.use(compression());


// Request Layer

app.use(express.json({
  limit: "10mb"
}));

app.use(express.urlencoded({
  extended: true
}));

app.use(morgan("combined"));


// Request ID

app.use((req, res, next) => {
  const id = crypto.randomUUID();

  req.requestId = id;

  res.setHeader(
    "X-BLUE-Request-ID",
    id
  );

  next();
});


// BLUE PROFILE

const BLUE = {
  name: "BLUE AI",
  version: "6.0.0",
  status: "healthy",
  architecture: "clean modular core",
  platform: "Render",
  runtime: "Node.js",
  modules: [
    "AI Core",
    "Memory Layer Ready",
    "Language Engine",
    "Time Layer",
    "Dashboard API",
    "Security Layer",
    "Monitoring Layer"
  ]
};


// Root

app.get("/", (req,res)=>{
  res.json({
    message:"BLUE AI Core Online",
    profile: BLUE
  });
});


// Health Check

app.get("/health",(req,res)=>{

  res.status(200).json({

    status:"healthy",

    uptime:
      process.uptime(),

    memory:
      process.memoryUsage(),

    cpu:
      os.loadavg(),

    time:
      new Date().toISOString()

  });

});


// Status API

app.get("/api/status",(req,res)=>{

  res.json({

    project:"BLUE AI",

    version:BLUE.version,

    status:"online",

    requestId:req.requestId

  });

});


// Profile API

app.get("/api/profile",(req,res)=>{

  res.json(BLUE);

});


// System API

app.get("/api/system",(req,res)=>{

  res.json({

    node:
      process.version,

    platform:
      process.platform,

    uptime:
      process.uptime()

  });

});


// 404

app.use((req,res)=>{

  res.status(404).json({

    status:"error",

    message:"Route not found"

  });

});


// Error Handler

app.use((err,req,res,next)=>{

  console.error(err);

  res.status(500).json({

    status:"error",

    message:"Internal server error"

  });

});


// Server Start

const server = app.listen(PORT,()=>{

  console.log(
    `BLUE AI v${BLUE.version} running on port ${PORT}`
  );

});


// Clean Shutdown

function shutdown(){

  console.log(
    "BLUE shutdown started"
  );

  server.close(()=>{

    console.log(
      "BLUE shutdown completed"
    );

    process.exit(0);

  });

}


process.on(
  "SIGTERM",
  shutdown
);

process.on(
  "SIGINT",
  shutdown
);
