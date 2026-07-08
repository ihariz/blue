import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";


dotenv.config();


const app = express();


const PORT = process.env.PORT || 3000;


const VERSION = "BLUE v1.0.0";


/*
 Security Middleware
*/

app.use(
  helmet()
);


app.use(
  cors({
    origin: "*"
  })
);


app.use(
  compression()
);


app.use(
  express.json()
);


app.use(
  morgan("combined")
);


/*
 Health API
*/

app.get(
  "/health",
  (req,res)=>{

    res.json({

      system:
        "BLUE AI",

      version:
        VERSION,

      status:
        "online",

      uptime:
        process.uptime(),

      time:
        new Date().toISOString()

    });

  }
);


/*
 Main API
*/

app.get(
  "/api/status",
  (req,res)=>{

    res.json({

      name:
        "BLUE AI Platform",

      version:
        VERSION,

      modules:
      [
        "AI Core",
        "Database Layer",
        "Security",
        "Dashboard",
        "API Gateway"
      ],

      status:
        "ready"

    });

  }
);


/*
 404 Handler
*/

app.use(
(req,res)=>{

 res.status(404).json({

   error:
    "Route not found",

   path:
    req.originalUrl

 });

});


/*
 Error Handler
*/

app.use(
(err,req,res,next)=>{

 console.error(err);


 res.status(500).json({

   error:
    "Internal Server Error"

 });

});


/*
 Start Server
*/

app.listen(
PORT,
()=>{

 console.log(
  `
 BLUE AI PLATFORM
 Version: ${VERSION}
 Port: ${PORT}
 Status: ONLINE
 `
 );

}
);
