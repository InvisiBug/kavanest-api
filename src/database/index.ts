require("dotenv").config();

export const options = { new: true, upsert: true };

export { FloodLightStore } from "./stores/devices";
export { RadiatorStore } from "./stores/devices";
export { SensorStore } from "./stores/devices";
