import { sensorStore, plugStore, rgbLightStore, specialsStore, roomStore, timerStore, radiatorStore, bulbStore, motionStore } from "../../database";

////////
//
// Plugs
//
///////
export const getPlug = async (_: any, { name }) => {
  return await plugStore.findOne({ name });
};

export const getPlugs = async () => {
  return await plugStore.find().toArray();
};

export const getPlugsInRoom = async (_: any, { name }) => {
  return await plugStore.find({ room: name }).toArray();
};

////////
//
// bulbs
//
///////
export const getBulb = async (_: any, { name }) => {
  return await bulbStore.findOne({ name });
};

export const getBulbs = async () => {
  return await bulbStore.find().toArray();
};

export const getBulbsInRoom = async (_: any, { name }) => {
  return await bulbStore.find({ room: name }).toArray();
};

////////
//
// RGB Lights
//
///////
export const getRGBLight = async (_: any, { name }) => {
  return await rgbLightStore.findOne({ name });
};

export const getRGBLights = async () => {
  return await rgbLightStore.find().toArray();
};

export const getRGBLightsInRoom = async (_: any, { name }) => {
  return await rgbLightStore.find({ room: name }).toArray();
};

////////
//
// Sensors
//
///////
export const getSensor = async (_: any, { room }) => {
  return await sensorStore.findOne({ room: room });
};
export const getSensors = async () => {
  const data = await sensorStore.find().maxTimeMS(1000).toArray();
  return data.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};

////////
//
// Computer Audio
//
///////
export const getComputerAudio = async () => {
  const specials = await specialsStore.find().toArray();
  let response: any;
  for (let key in specials) {
    if (specials[key].name == "computerAudio") {
      response = specials[key];
    }
  }
  return response;
};

////////
//
// Rooms
//
///////
export const getRoom = async (_: any, { name }) => {
  const data = await roomStore.findOne({ name });
  return data;
};

export const getRooms = async () => {
  return await roomStore.find().toArray();
};

////////
//
// Timers
//
///////
export const getTimer = async (_: any, { name }) => {
  return await timerStore.findOne({ name });
};

export const getTimers = async () => {
  return await timerStore.find().toArray();
};

////////
//
// Motion Controllers
//
///////
export const getMotionController = async (_, { name }) => {
  return await motionStore.findOne({ name });
};

export const getMotionControllers = async () => {
  return await motionStore.find().toArray();
};

////////
//
// Radiators
//
///////
export const getRadiator = async (_, { name }) => {
  return await radiatorStore.findOne({ name });
};

export const getRadiators = async () => {
  const data = await radiatorStore.find().toArray();
  return data.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};
