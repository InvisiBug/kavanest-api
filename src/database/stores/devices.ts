import mongoose from "mongoose";
import { Floodlight, Radiator, Sensor } from "../schemas";
require("dotenv").config();

const devicesConnection = mongoose.createConnection(process.env.URI ?? "");
export const FloodLightStore = devicesConnection.model<FloodLight>("floodlight", Floodlight);
export const RadiatorStore = devicesConnection.model<Radiator>("radiator", Radiator);
export const SensorStore = devicesConnection.model<Sensor>("sensor", Sensor);

devicesConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + process.env.URI ?? "");
});

devicesConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});

interface FloodLight  {
  id: string;
  state: string;
}

interface Radiator {
  inlet: number;
  outlet: number;
}

interface Sensor {
  room: string;
  temperature: number;
  humidity: number;
}
