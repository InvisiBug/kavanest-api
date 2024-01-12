import { updatePlug, updateRGBLights, updateComputerAudio, updateRoom, updateTimer, deleteSetpoint, updateRadiator } from "./mutations";

import {
  getPlugs,
  getPlug,
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
  getPlugsInRoom,
} from "./queries";

export const resolvers = {
  Query: {
    getPlug,
    getPlugs,
    getPlugsInRoom,

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

    deleteSetpoint,

    updateComputerAudio,

    updateRoom,

    updateTimer,

    updateRadiator,
  },
};

export default resolvers;
