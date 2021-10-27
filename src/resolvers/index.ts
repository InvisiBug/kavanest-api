import { friend } from "../mocks";

const resolvers = {
  Query: {
    friend: () => {
      return friend;
    },
  },
};

export default resolvers;
