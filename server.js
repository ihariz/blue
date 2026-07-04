import express from "express";
import jwt from "jsonwebtoken";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(helmet());

const SECRET = "blue_v8";

function auth(req,res,next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET);
    next();
  }catch{
    res.status(401).send("NO ACCESS");
  }
}

app.get("/secure", auth, (req,res)=>{
  res.json({ system:"V8 SECURE CORE" });
});

app.listen(3000);
