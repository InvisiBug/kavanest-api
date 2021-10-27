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
    createFriend: ({ input }) => {
      // let x = input;
      // console.log("here");
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDatabase[id] = input;
      return new FriendClass(id, input);
    },
  },
};

export default resolvers;
