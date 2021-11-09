import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema({
  room: { type: String },
  rawTemperature: { type: Number },
  temperature: { type: Number },
  humidity: { type: String },
  connected: { type: Boolean },
});

export default SensorSchema;
