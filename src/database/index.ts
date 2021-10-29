require("dotenv").config();

export const options = { new: true, upsert: true };

export { AlienStore } from "./stores/alien";
export { FriendStore } from "./stores/friend";
export { FloodLightStore } from "./stores/devices";
export { RadiatorStore } from "./stores/devices";
export { SensorStore } from "./stores/devices";
