import { radiatorStore, floodlightStore, sensorStore, plugStore, offsetStore } from "../database";
import { updatePlug } from "./controllers";

const resolvers = {
  Query: {
    getRadiator: async () => {
      return await radiatorStore.find();
    },
    getPlugs: async () => {
      return await plugStore.find();
    },
    getPlug: async (_: any, { name }) => {
      return await plugStore.findOne({ name });
    },
    getFloodlight: async () => {
      return await floodlightStore.find();
    },
    getAllSensors: async () => {
      return await sensorStore.find();
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },
    getOffsets: async () => {
      return await offsetStore.find();
    },
  },
  Mutation: {
    updatePlug,
  },
};

export default resolvers;
