import { friend, books } from "../mocks";
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
    createFriend: (_: any, { input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDatabase[id] = input;

      console.log(friendDatabase[id]);
      return new FriendClass(id, input);
    },
  },
};

export default resolvers;
