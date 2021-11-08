import { radiatorStore, floodlightStore, sensorStore, plugStore } from "../database";
import { updatePlug } from "../controllers/index";
require("dotenv").config();
import mqtt from "mqtt";

const MQTT: string = process.env.MQTT ?? "";

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
    getRawSensors: async () => {
      return await sensorStore.find();
    },
    getSensor: async (_: any, { room }) => {
      return await sensorStore.findOne({ room: room });
    },
  },
  Mutation: {
    updatePlug,
    // createFriend: async (_: any, { input }) => {
    //   const newFriend = new FriendStore({
    //     firstName: input.firstName,
    //     lastName: input.lastName,
    //     gender: input.gender,
    //     age: input.age,
    //     email: input.email,
    //     language: input.language,
    //     contacs: input.contacts,
    //   });
    //   const output = await newFriend.save();
    //   return output;
    // },
    // updateFriend: async (_: any, { input }) => {
    //   return await FriendStore.findOneAndUpdate({ _id: input.id }, input, { new: true });
    // },
    // deleteFriend: async (_: any, { id }) => {
    //   await FriendStore.deleteOne({ _id: id });
    //   return "Deleted Friend";
    // },
  },
};

export default resolvers;
