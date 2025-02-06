import {
  updatePlug,
  updateRGBLights,
  updateBulb,
  updateComputerAudio,
  updateRoom,
  updateTimer,
  deleteSetpoint,
  updateRadiator,
  updateMotionController,
} from "./mutations";

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
  getMotionController,
  getMotionControllers,
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

    getSensor,
    getSensors,

    getComputerAudio,

    getRoom,
    getRooms,

    getTimer,
    getTimers,

    getRadiator,
    getRadiators,

    getMotionController,
    getMotionControllers,
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

    updateMotionController,
  },
};

export default resolvers;
