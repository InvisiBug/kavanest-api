import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  age: { type: Number },
  email: { type: String },
  contacts: { type: Array },
  language: { type: String },
});

export default FriendSchema;
