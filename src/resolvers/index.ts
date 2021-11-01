import { FriendStore, AlienStore, RadiatorStore, FloodLightStore, SensorStore } from "../database";

const resolvers = {
  Query: {
    // friend: () => {
    //   return friend;
    // },
    // getOneFriend: async (_: any, { id }) => {
    //   return FriendStore.findById({ _id: id });
    // },
    // getAllAliens: async () => {
    //   return await AlienStore.find();
    // },
    getRadiator: async () => {
      return await RadiatorStore.find();
    },
    getFloodlight: async () => {
      return await FloodLightStore.find();
    },
    getRawSensors: async () => {
      return await SensorStore.find();
    },
    getSensor: async (_: any, { room }) => {
      return await SensorStore.findOne({ room: room });
    },
  },
  // Mutation: {
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
  // },
};

export default resolvers;
