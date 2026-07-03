const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("💙 BLUE IS LIVE 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BLUE running");
});
