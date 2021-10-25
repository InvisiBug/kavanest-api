import express from "express";
import { connectToDB } from "./service/dbService";

const app = express();
require("dotenv").config();

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
    console.error("Database connection failed", error);
    process.exit();
  });

console.log("🚀 App Running");
