import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import resolvers from "./resolvers";
import { log } from "./helpers";
import path from "path";

//* GraphQL server config
const typeDefs = readFileSync(path.resolve(__dirname, "./schema/schema.gql"), "utf-8");
const schema = makeExecutableSchema({ resolvers, typeDefs });

const logging: Boolean = false;

const server = new ApolloServer({
  schema,
  context: logging ? log : null,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
