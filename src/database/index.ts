//* These mongo docs seem to work fine
// https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOneAndUpdate

import Mongo from "./mongo";

const db = "devices";

export const rgbLightStore = new Mongo(db, "rgbLight").collection;
export const radiatorStore = new Mongo(db, "radiator").collection;
export const offsetStore = new Mongo(db, "offsets").collection;
export const sensorStore = new Mongo(db, "sensors").collection;
export const valveStore = new Mongo(db, "valves").collection;
export const plugStore = new Mongo(db, "plugs").collection;

export const setpointsStore = new Mongo("setpoints", "setpoints").collection;

export const options: Options = { returnDocument: "after", upsert: true };

interface Options {
  returnDocument: "before" | "after";
  upsert: boolean;
}
