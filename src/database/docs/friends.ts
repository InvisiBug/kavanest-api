import mongoose from "mongoose";

// Mongo Connection
mongoose.Promise = global.Promise;
const conn = mongoose.createConnection("mongodb://localhost:27017/friends");

const friendSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  age: { type: Number },
  email: { type: String },
  contacts: { type: Array },
});

const Friends = conn.model("friends", friendSchema);

export default Friends;
