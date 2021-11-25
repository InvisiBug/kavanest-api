import { radiatorStore, sensorStore, plugStore, setpointsStore, valveStore } from "../database";
import { updatePlug, updateRGBLights } from "./controllers";
import updateOffset from "./setpoints/offsets";
import { updateSetpoint } from "./setpoints";

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
      return await sensorStore.find().toArray();
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },

    getAllSetpoints: async () => {
      return await setpointsStore.find().toArray();
    },
    getSetpoints: async (_: any, { room }) => {
      return await setpointsStore.findOne({ room: room });
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
    updateSetpoint,
  },
};

export default resolvers;
