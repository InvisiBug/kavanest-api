import {
  updatePlug,
  updateRGBLights,
  updateComputerAudio,
  updateValve,
  updateRoom,
  updateTimer,
  updateOffset,
  deleteSetpoint,
} from "./mutations/controllers";
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
