import mongoose from "mongoose";
import { Floodlight, Radiator } from "../schemas";

const devicesConnection = mongoose.createConnection("mongodb://localhost:27017/devices");
export const FloodLightStore = devicesConnection.model("floodlight", Floodlight);
export const RadiatorStore = devicesConnection.model("radiator", Radiator);

interface FloodLight {
  id: string;
  state: string;
}

devicesConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + "mongodb://localhost:27017/devices");
});

devicesConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});
