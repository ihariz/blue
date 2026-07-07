import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = "BLUE v32.1.0";

const INSTANCE = uuidv4();

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
    windowMs: 60000,
    max: 100
  })
);

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(morgan("combined"));


const publicFolder = path.join(
  __dirname,
  "public"
);

app.use(
  express.static(publicFolder)
);


app.get("/", (req,res)=>{

  res.sendFile(
    path.join(
      publicFolder,
      "index.html"
    ),
    (err)=>{

      if(err){
        res.send(`
        <h1>BLUE AI CORE ONLINE</h1>
        <p>${VERSION}</p>
        `);
      }

    }
  );

});


app.get("/health",(req,res)=>{

  res.json({
    status:"online",
    version:VERSION,
    instance:INSTANCE,
    uptime:process.uptime()
  });

});


app.get("/api/status",(req,res)=>{

  res.json({

    blue:"active",
    version:VERSION,
    server:"Render",
    node:process.version,
    started:startTime

  });

});


app.get("/api/version",(req,res)=>{

  res.json({

    project:"BLUE",
    version:VERSION

  });

});


app.get("/api/ping",(req,res)=>{

  res.json({
    ping:"ok"
  });

});


app.use((req,res)=>{

  res.status(404).json({
    error:"Route not found"
  });

});


app.listen(PORT,()=>{

console.log(`
====================
 BLUE ONLINE
 ${VERSION}
 PORT ${PORT}
====================
`);

});
