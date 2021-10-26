import mocks from "../mocks";

const resolvers = {
  Query: {
    people: () => mocks,
  },
};

export default resolvers;
