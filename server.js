const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
 res.send("BLUE v32 ONLINE");
});

app.listen(PORT,()=>{
 console.log("BLUE running");
});
