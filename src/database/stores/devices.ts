import { floodlightSchema, radiatorSchema, sensorSchema, plugSchema } from "../schemas";
import mongoose from "mongoose";
require("dotenv").config();

const devicesConnection = mongoose.createConnection(process.env.URI ?? "");
export const floodlightStore = devicesConnection.model<FloodLight>("floodlight", floodlightSchema);
export const radiatorStore = devicesConnection.model<Radiator>("radiator", radiatorSchema);
export const sensorStore = devicesConnection.model<Sensor>("sensor", sensorSchema);
export const plugStore = devicesConnection.model<Plug>("plug", plugSchema);

devicesConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + process.env.URI ?? "");
});

devicesConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});

interface FloodLight {
  id: string;
  state: string;
}
interface Plug {
  name: string;
  state: boolean;
  connected: boolean;
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
