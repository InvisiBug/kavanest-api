import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { readFileSync } from "fs";
import { log } from "./helpers";
import path from "path";

//* GraphQL server config
const typeDefs = readFileSync(path.resolve(__dirname, "./schema/schema.gql"), "utf-8");
const schema = makeExecutableSchema({ resolvers, typeDefs });

const logging: Boolean = false;

const server = new ApolloServer({
  schema,
  context: logging ? log : null,
  formatError: (err) => {
    console.log("Error encountered, restarting");
    process.exit();
    // console.log(err);
    // console.log(err.extensions.exception.reason.topologyVersion);
    // // Don't give the specific errors to the client.
    // if (err.message.startsWith("connect ECONNREFUSED: ")) {
    //   console.log("this error here");
    //   return new Error("Internal server error");
    // }
    // // Otherwise return the original error. The error can also
    // // be manipulated in other ways, as long as it's returned.
    return err;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
