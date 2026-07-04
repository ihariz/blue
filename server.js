import express from "express";
import mongoose from "mongoose";
import redis from "redis";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/blue");

const client = redis.createClient();
await client.connect();

app.get("/status", async (req,res)=>{
  res.json({ system:"V10 ENTERPRISE READY" });
});

app.listen(3000);
