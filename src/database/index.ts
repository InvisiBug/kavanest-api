//* These mongo docs seem to work fine
// https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOneAndUpdate

import Mongo from "./mongo";

const mongo = new Mongo();

// Devices
export const rgbLightStore = mongo.newCollection("devices", "rgbLights");
export const radiatorStore = mongo.newCollection("devices", "radiators");
export const offsetStore = mongo.newCollection("devices", "offsets");
export const sensorStore = mongo.newCollection("devices", "sensors");
export const plugStore = mongo.newCollection("devices", "plugs");
export const rasiatorStore = mongo.newCollection("devices", "radiators");
export const bulbStore = mongo.newCollection("devices", "bulbs");

// Heating Controller
export const setpointsStore = mongo.newCollection("heatingController", "setpoints");
export const roomStore = mongo.newCollection("heatingController", "rooms");
export const timerStore = mongo.newCollection("heatingController", "timers");

export const specialsStore = mongo.newCollection("devices", "specials");

export const options: Options = { returnDocument: "after", upsert: true };

export interface Options {
  returnDocument: "before" | "after";
  upsert: boolean;
}
