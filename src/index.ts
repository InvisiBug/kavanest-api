import express from "express";
import { connectToDB } from "./service/dbService";
require("dotenv").config();

const app = express();

//* Environment dependant stuff
const URI: string = process.env.URI ?? "";
const DATABASE: string = process.env.DATABASE ?? "";
const COLLECTION = process.env.COLLECTION ?? "";

const startServer = async () => {
  const port: number = 8081;

  app.listen({ port: port }, () => {
    console.log("Node app is running at localhost:" + port);
  });
};

connectToDB(URI, DATABASE, COLLECTION)
  .then(() => {
    startServer();
  })
  .catch((error: Error) => {
    console.error(error, "Database connection failed");
    process.exit();
  });

console.log("🚀 App Running");
