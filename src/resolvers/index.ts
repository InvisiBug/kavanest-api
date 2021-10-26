import { people, books } from "../mocks";

const resolvers = {
  Query: {
    people: () => people,
    books: () => books,
  },
};

export default resolvers;
