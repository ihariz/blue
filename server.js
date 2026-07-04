import express from "express";

const app = express();
app.use(express.json());

function aiEngine(input){
  return `AI processed: ${input}`;
}

app.post("/ai",(req,res)=>{
  res.json({ result: aiEngine(req.body.text) });
});

app.listen(3000);
