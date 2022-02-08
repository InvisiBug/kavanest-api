import { updatePlug, updateRGBLights, updateComputerAudio, updateValve, updateRoom, updateTimer } from "./mutations/controllers";
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
import updateOffset from "./mutations/setpoints/offsets";
import updateDeadzone from "./mutations/setpoints/deadzones";
import { deleteSetpoint } from "./mutations/setpoints/";

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
