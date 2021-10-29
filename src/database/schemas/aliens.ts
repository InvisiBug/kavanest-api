import mongoose from "mongoose";

const AliensSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  planet: { type: String },
});

export default AliensSchema;
