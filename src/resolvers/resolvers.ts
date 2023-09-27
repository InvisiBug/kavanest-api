import { updatePlug, updateRGBLights, updateComputerAudio, updateRoom, updateTimer, updateOffset, deleteSetpoint, updateRadiator } from "./mutations";

import {
  getPlugs,
  getPlug,
  getRGBLights,
  getRGBLight,
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
    getPlugs,
    getPlug,

    getRGBLights,
    getRGBLight,

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
    updateOffset,
    updateRGBLights,

    deleteSetpoint,

    updateComputerAudio,

    updateRoom,

    updateTimer,

    updateRadiator,
  },
};

export default resolvers;
