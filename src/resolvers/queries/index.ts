import {
  sensorStore,
  plugStore,
  setpointsStore,
  valveStore,
  rgbLightStore,
  specialsStore,
  roomStore,
  timerStore,
  radiatorStore,
} from "../../database";

// Plugs
export const getPlugs = async () => {
  return await plugStore.find().toArray();
};
export const getPlug = async (_: any, { name }) => {
  return await plugStore.findOne({ name });
};

// RGB Lights
export const getRGBLights = async () => {
  return await rgbLightStore.find().toArray();
};
export const getRGBLight = async (_: any, { name }) => {
  return await rgbLightStore.findOne({ name });
};

// Sensors
export const getSensors = async () => {
  const data = await sensorStore.find().toArray();

  data.sort((a, b) => (a.sort > b.sort ? 1 : -1));

  return data;
};
export const getSensor = async (_: any, { room }) => {
  return await sensorStore.findOne({ room: room });
};

export const getSetpoints = async () => {
  return await setpointsStore.find().toArray();
};
export const getSetpoint = async (_: any, { room }) => {
  return await setpointsStore.findOne({ room: room });
};

// Valves
export const getValves = async () => {
  const data = await valveStore.find().toArray();

  data.sort((a, b) => (a.sort > b.sort ? 1 : -1));
  return data;
};
export const getValve = async (_: any, { room }) => {
  return await valveStore.findOne({ room });
};

// Computer Audio
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

// Rooms
export const getRooms = async () => {
  return await roomStore.find().toArray();
};
export const getRoom = async (_: any, { room }) => {
  return await roomStore.findOne({ room });
};

// Timers
export const getTimers = async () => {
  return await timerStore.find().toArray();
};
export const getTimer = async (_: any, { timer }) => {
  return await timerStore.findOne({ timer });
};

export const getRadiator = async (_: any, { room }) => {
  return await radiatorStore.findOne({ room });
};
