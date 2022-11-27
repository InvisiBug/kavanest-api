import { updatePlug, updateRGBLights, updateComputerAudio, updateValve, updateRoom, updateTimer, updateOffset, deleteSetpoint } from "./mutations";
import {
  getPlugs,
  getPlug,
  getRGBLights,
  getRGBLight,
  getSensors,
  getSensor,
  getValves,
  getValve,
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

    getValves,
    getValve,

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

    updateValve,
    updateRoom,

    updateTimer,
  },
};

export default resolvers;
