import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req,res)=>{
  res.send("BLUE V9 AI CORE");
});

io.on("connection",(socket)=>{
  socket.emit("status",{ai:"online"});
});

server.listen(3000);
