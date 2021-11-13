import { radiatorStore, sensorStore, plugStore, offsetStore, valveStore } from "kavanest-store";
import { updatePlug, updateRGBLights } from "./controllers";
import offsets from "./setpoints/offsets";

const resolvers = {
  Query: {
    getRadiator: async () => {
      return await radiatorStore.find();
    },

    // Plugs
    getPlugs: async () => {
      return await plugStore.find();
    },
    getPlug: async (_: any, { name }) => {
      return await plugStore.findOne({ name });
    },

    // Sensors
    getAllSensors: async () => {
      return await sensorStore.find();
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },
    getOffsets: async () => {
      return await offsetStore.findOne({ name: "roomOffsets" });
    },

    // Valves
    getValves: async () => {
      return await valveStore.find();
    },
    getValve: async (_: any, { name }) => {
      return await valveStore.findOne({ name });
    },
  },
  Mutation: {
    updatePlug,
    offsets,
    updateRGBLights,
  },
};

export default resolvers;
