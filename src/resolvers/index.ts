import { sensorStore, plugStore, setpointsStore, valveStore, rgbLightStore, specialsStore } from "../database";
import { updatePlug, updateRGBLights, updateComputerAudio } from "./controllers";
import updateOffset from "./setpoints/offsets";
import updateDeadzone from "./setpoints/deadzones";
import { updateSetpoint, deleteSetpoint } from "./setpoints";

const resolvers = {
  Query: {
    // Plugs
    getPlugs: async () => {
      return await plugStore.find().toArray();
    },
    getPlug: async (_: any, { name }) => {
      return await plugStore.findOne({ name });
    },

    // RGB Lights
    getRGBLights: async () => {
      return await rgbLightStore.find().toArray();
    },
    getRGBLight: async (_: any, { name }) => {
      return await rgbLightStore.findOne({ name });
    },

    // Sensors
    getSensors: async () => {
      return await sensorStore.find().toArray();
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },

    getSetpoints: async () => {
      return await setpointsStore.find().toArray();
    },
    getSetpoint: async (_: any, { room }) => {
      return await setpointsStore.findOne({ room: room });
    },

    // Valves
    getValves: async () => {
      return await valveStore.find().toArray();
    },
    getValve: async (_: any, { room }) => {
      return await valveStore.findOne({ room });
    },

    // Computer Audio
    getComputerAudio: async () => {
      const specials = await specialsStore.find().toArray();
      let response: any;
      for (let key in specials) {
        if (specials[key].name == "computerAudio") {
          response = specials[key];
        }
      }
      return response;
    },
  },
  Mutation: {
    updatePlug,
    updateOffset,
    updateRGBLights,

    updateDeadzone,
    updateSetpoint,
    deleteSetpoint,

    updateComputerAudio,
  },
};

export default resolvers;
