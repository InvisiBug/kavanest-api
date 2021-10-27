import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import resolvers from "./resolvers";
import path from "path";

//* GraphQL server config
const typeDefs = readFileSync(path.resolve(__dirname, "./schema/schema.graphql"), "utf-8");
const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new ApolloServer({ schema, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
