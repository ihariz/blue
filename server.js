require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");


const app = express();

const PORT = process.env.PORT || 3000;


// Security
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());


// Protection
app.use(
 rateLimit({
  windowMs:60000,
  max:100
 })
);


// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const aiRoutes = require("./routes/ai");


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/ai",aiRoutes);


// BLUE Languages
const languages=[
"English",
"Nepali",
"Bahasa Melayu",
"Bahasa Indonesia",
"Bahasa Bali",
"Sanskrit",
"Chinese Simplified",
"Chinese Traditional",
"Portuguese",
"Brazilian Portuguese"
];


// Home Status
app.get("/",(req,res)=>{

res.json({

system:"BLUE AI",

version:"v32",

status:"ONLINE",

platform:"Full SaaS AI",

languages,

modules:{
authentication:"ACTIVE",
database:"ACTIVE",
memory:"ACTIVE",
ai:"ACTIVE",
dashboard:"ACTIVE"
},

time:new Date()

});

});


// Dashboard
app.get("/api/dashboard",(req,res)=>{

res.json({

system:"BLUE CONTROL ROOM",

version:"v32",

status:"ONLINE",

modules:{
AI:"ACTIVE",
Memory:"ACTIVE",
Language:"ACTIVE",
SaaS:"ACTIVE"
}

});

});


// Database Health
app.get("/api/health",(req,res)=>{

res.json({

server:"ONLINE",

version:"BLUE v32",

timestamp:new Date()

});

});


// Start
app.listen(PORT,()=>{

console.log(
`BLUE v32 running port ${PORT}`
);

});
