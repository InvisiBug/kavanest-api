import mongoose from "mongoose";

const AlienSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  planet: { type: String },
});

export default AlienSchema;
