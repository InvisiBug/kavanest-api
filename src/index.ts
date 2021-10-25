const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connecting to mongodb
mongoose.connect("mongodb://mongo/myappdb", (err: Error) => {
  if (err) throw err;
  console.log("connected to mongo");
});

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"));
});

console.log("hels");
