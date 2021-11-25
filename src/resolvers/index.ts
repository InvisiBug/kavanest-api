import { radiatorStore, sensorStore, plugStore, offsetStore, valveStore } from "../database";
import { updatePlug, updateRGBLights } from "./controllers";
import updateOffset from "./setpoints/offsets";
import { setpoint } from "./setpoints";

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

    // Sensors
    getAllSensors: async () => {
      const sensors = await sensorStore.find().toArray();
      return sensors;
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },

    // Valves
    getValves: async () => {
      return await valveStore.find().toArray();
    },
    getValve: async (_: any, { name }) => {
      return await valveStore.findOne({ name });
    },
  },
  Mutation: {
    updatePlug,
    updateOffset,
    updateRGBLights,
    setpoint,
  },
};

export default resolvers;
