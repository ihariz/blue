import express from "express";

const app = express();
app.use(express.json());

let state = { load: 0 };

function loop(){
  state.load = Math.random()*100;

  if(state.load > 80){
    console.log("AUTO SCALE TRIGGERED");
  }
}

setInterval(loop, 2000);

app.get("/state",(req,res)=>{
  res.json(state);
});

app.listen(3000);
