//* These mongo docs seem to work fine
// https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOneAndUpdate

import Mongo from "./mongo";

export const rgbLightStore = new Mongo("devices", "rgbLight").collection;
export const radiatorStore = new Mongo("devices", "radiator").collection;
export const offsetStore = new Mongo("devices", "offsets").collection;
export const sensorStore = new Mongo("devices", "sensors").collection;
export const valveStore = new Mongo("devices", "valves").collection;
export const plugStore = new Mongo("devices", "plugs").collection;

export const setpointsStore = new Mongo("heatingController", "setpoints").collection;

export const options: Options = { returnDocument: "after", upsert: true };

export interface Options {
  returnDocument: "before" | "after";
  upsert: boolean;
}
