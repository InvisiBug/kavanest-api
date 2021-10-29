import mongoose from "mongoose";

// Mongo Connection
mongoose.Promise = global.Promise;
const conn = mongoose.createConnection("mongodb://localhost:27017/aliens");

const aliensSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  planet: { type: String },
});

const Aliens = conn.model("aliens", aliensSchema);

export default Aliens;

const newAlien = new Aliens({ firstName: "Bob", lastName: "Burger", planet: "Earth" });
newAlien.save();

// console.log(awauAliens.find());
