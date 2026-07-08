import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";


import { connectDatabase }
from "./src/database/database.js";


import authRoutes
from "./src/auth/auth.routes.js";


import securityRoutes
from "./src/routes/security.routes.js";


import observabilityRoutes
from "./src/routes/observability.routes.js";


import { createRealtimeServer }
from "./src/realtime/websocket.server.js";


dotenv.config();


const app = express();


const server =
http.createServer(app);


const PORT =
process.env.PORT || 3000;


const VERSION =
"BLUE Enterprise v2.0 STEP 100";



/*
 Security
*/

app.use(
helmet()
);


app.use(
cors({
 origin:"*"
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
 Database
*/

if(process.env.MONGO_URI){

 await connectDatabase();

}



/*
 Routes
*/


app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/security",
securityRoutes
);


app.use(
"/api",
observabilityRoutes
);



/*
 Health
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

  timestamp:
   new Date().toISOString()

 });

});



/*
 Main Status
*/

app.get(
"/api/status",
(req,res)=>{

 res.json({

  name:
   "BLUE Enterprise",

  version:
   VERSION,

  modules:[

   "AI Core",

   "Database",

   "Authentication",

   "Security",

   "Realtime",

   "Dashboard",

   "Monitoring",

   "Cloud"

  ],

  status:
   "ready"

 });

});



/*
 WebSocket
*/

createRealtimeServer(
server
);



/*
 404
*/

app.use(
(req,res)=>{

 res.status(404).json({

  error:
   "Route not found"

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



server.listen(
PORT,
()=>{

 console.log(`

 BLUE ENTERPRISE AI

 Version: ${VERSION}

 Port: ${PORT}

 Status: ONLINE

 `);

});
