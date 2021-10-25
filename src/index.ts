import express from "express";
// import mongoose from "mongoose";
const app = express();

//Import the mongoose module
import mongoose from "mongoose";

//Set up default mongoose connection
var dbUrl = "mongodb://localhost";
mongoose.connect(dbUrl);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"));
});

console.log("🚀 App Running");

// setInterval(() => {}, 10);
