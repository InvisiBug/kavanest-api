import { friend, books } from "../mocks";
import { Friends } from "../database";
import FriendClass from "../database";
let friendDatabase = {};

const resolvers = {
  Query: {
    friend: () => {
      return friend;
    },
    getFriend: ({ id }) => {
      return new FriendClass(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: async (_: any, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        email: input.email,
        language: input.language,
        contacs: input.contacts,
      });

      newFriend.id = newFriend._id;

      const output = await newFriend.save();
      return output;

      // return new Promise((resolve, object) => {
      //   let x = object;
      //   newFriend.save((err) => {
      //     if (err) console.log(err);
      //     else resolve(newFriend);
      //   });
      // });
    },
    updateFriend: async (_: any, { input }) => {
      return await Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });

      // return new Promise((resolve, reject) => {
      //   Friends.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, updatedFriend) => {
      //     if (err) reject(err);
      //     return resolve(updatedFriend);
      //   });
      // });
    },
    deleteFriend: async (_: any, { id }) => {
      await Friends.deleteOne({ _id: id });
      return "Deleted Friend";
    },
  },
};

export default resolvers;
