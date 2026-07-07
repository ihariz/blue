import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  name: String,

  timeLayer: {
    primary: {
      location: String,
      timezone: String,
      utc: String
    },

    secondary: {
      location: String,
      timezone: String,
      utc: String
    }
  }
});

const BlueMemory = mongoose.model(
  "BlueMemory",
  userSchema
);


app.get("/memory", async (req,res)=>{

 const memory = await BlueMemory.findOne();

 res.json(memory);

});


app.post("/memory", async(req,res)=>{

 const saved = await BlueMemory.findOneAndUpdate(
 {},
 req.body,
 {
  upsert:true,
  new:true
 }
 );

 res.json(saved);

});
