import express from "express";
import { ApolloServer, gql } from "apollo-server";
import { connectToDB } from "./service/dbService";
require("dotenv").config();
import resolvers from "./resolvers";
import mocks from "./mocks";
import { readFileSync } from "fs";
import path from "path";

import { makeExecutableSchema } from "@graphql-tools/schema";
const app = express();

//* Environment dependant stuff
// const URI: string = process.env.URI ?? "";
// const DATABASE: string = process.env.DATABASE ?? "";
// const COLLECTION = process.env.COLLECTION ?? "";

// const startServer = async () => {
//   const port: number = 8081;

//   app.listen({ port: port }, () => {
//     console.log("Node app is running at localhost:" + port);
//   });
// };

// connectToDB(URI, DATABASE, COLLECTION)
//   .then(() => {
//     startServer();
//   })
//   .catch((error: Error) => {
//     console.error(error, "Database connection failed");
//     process.exit();
//   });

// console.log("🚀 App Running");

// const schema = gql`
//   type Query {
//     hello: String
//   }
// `;

// const server = new ApolloServer({
//   schema,
//   mocks: users,
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

//* GraphQL server config
const typeDefs = readFileSync(path.resolve(__dirname, "./schema/schema.graphql"), "utf-8");
const schema = makeExecutableSchema({ resolvers, typeDefs });

console.log(mocks);
