import mocks from "../mocks";

const resolvers = {
  Query: {
    books: () => mocks,
  },
};

export default resolvers;
