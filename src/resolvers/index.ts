import { updatePlug, updateRGBLights, updateComputerAudio, updateValve, updateRoom, updateTimer } from "./mutations/controllers";
import {
  getPlugs,
  getPlug,
  getRGBLights,
  getRGBLight,
  getSensors,
  getSensor,
  getSetpoints,
  getSetpoint,
  getValves,
  getValve,
  getComputerAudio,
  getRooms,
  getRoom,
  getTimers,
  getTimer,
} from "./queries";
import updateOffset from "./mutations/setpoints/offsets";
import updateDeadzone from "./mutations/setpoints/deadzones";
import { updateSetpoint, deleteSetpoint } from "./mutations/setpoints/";

const resolvers = {
  Query: {
    getPlugs,
    getPlug,

    getRGBLights,
    getRGBLight,

    getSensors,
    getSensor,

    getSetpoints,
    getSetpoint,

    getValves,
    getValve,

    getComputerAudio,

    getRooms,
    getRoom,

    getTimers,
    getTimer,
  },
  Mutation: {
    updatePlug,
    updateOffset,
    updateRGBLights,

    updateDeadzone,
    updateSetpoint,
    deleteSetpoint,

    updateComputerAudio,

    updateValve,
    updateRoom,

    updateTimer,
  },
};

export default resolvers;
