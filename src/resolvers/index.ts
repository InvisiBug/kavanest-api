import { radiatorStore, sensorStore, plugStore, setpointsStore, valveStore, rgbLightStore } from "../database";
import { updatePlug, updateRGBLights } from "./controllers";
import updateOffset from "./setpoints/offsets";
import { updateSetpoint, deleteSetpoint } from "./setpoints";

const resolvers = {
  Query: {
    getRadiator: async () => {
      return await radiatorStore.findOne({ room: "ourRoom" });
    },

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
  },
  Mutation: {
    updatePlug,
    updateOffset,
    updateRGBLights,
    updateSetpoint,
    deleteSetpoint,
  },
};

export default resolvers;
