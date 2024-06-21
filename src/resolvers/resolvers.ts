import { updatePlug, updateRGBLights, updateBulb, updateComputerAudio, updateRoom, updateTimer, deleteSetpoint, updateRadiator } from "./mutations";

import {
  getPlugs,
  getPlug,
  getPlugsInRoom,
  getBulbs,
  getBulb,
  getBulbsInRoom,
  getRGBLight,
  getRGBLights,
  getRGBLightsInRoom,
  getSensors,
  getSensor,
  getComputerAudio,
  getRooms,
  getRoom,
  getTimers,
  getTimer,
  getRadiator,
  getRadiators,
} from "./queries";

export const resolvers = {
  Query: {
    getPlug,
    getPlugs,
    getPlugsInRoom,

    getBulb,
    getBulbs,
    getBulbsInRoom,

    getRGBLight,
    getRGBLights,
    getRGBLightsInRoom,

    getSensors,
    getSensor,

    getComputerAudio,

    getRooms,
    getRoom,

    getTimers,
    getTimer,

    getRadiator,
    getRadiators,
  },
  Mutation: {
    updatePlug,

    updateRGBLights,

    updateBulb,

    deleteSetpoint,

    updateComputerAudio,

    updateRoom,

    updateTimer,

    updateRadiator,
  },
};

export default resolvers;
