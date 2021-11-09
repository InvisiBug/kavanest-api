import { floodlightSchema, radiatorSchema, sensorSchema, plugSchema, offsetSchema } from "../schemas";
import mongoose from "mongoose";
require("dotenv").config();

const connection = mongoose.createConnection(process.env.URI ?? "");
export const floodlightStore = connection.model<FloodLight>("floodlight", floodlightSchema);
export const radiatorStore = connection.model<Radiator>("radiator", radiatorSchema);
export const sensorStore = connection.model<Sensor>("sensor", sensorSchema);
export const plugStore = connection.model<Plug>("plug", plugSchema);
export const offsetStore = connection.model("offset", offsetSchema);

connection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + process.env.URI ?? "");
});

connection.on("error", (err) => {
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
