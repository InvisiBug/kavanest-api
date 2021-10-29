import { friend, books } from "../mocks";
import { FriendStore, AlienStore, RadiatorStore } from "../database";
let friendDatabase = {};

const resolvers = {
  Query: {
    friend: () => {
      return friend;
    },
    getOneFriend: async (_: any, { id }) => {
      return FriendStore.findById({ _id: id });
    },
    getAllAliens: async () => {
      return await AlienStore.find();
    },
    getRadiator: async () => {
      const save = await RadiatorStore.find();
      console.log(save);
      return save;
    },
    // getFloodlight: async () =>{
    //   return await
    // }
  },
  Mutation: {
    createFriend: async (_: any, { input }) => {
      const newFriend = new FriendStore({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        email: input.email,
        language: input.language,
        contacs: input.contacts,
      });

      const output = await newFriend.save();
      return output;
    },
    updateFriend: async (_: any, { input }) => {
      return await FriendStore.findOneAndUpdate({ _id: input.id }, input, { new: true });
    },
    deleteFriend: async (_: any, { id }) => {
      await FriendStore.deleteOne({ _id: id });
      return "Deleted Friend";
    },
  },
};

export default resolvers;
