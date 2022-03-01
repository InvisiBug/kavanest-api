import { Collection, Db, MongoClient, MongoClientOptions } from "mongodb";
require("dotenv").config();
import { mongoUrl } from "../helpers";

/*
  Create the mongo client then connect with it,
  Once connected, connect to the database then the collection.
  The collection property will be used as the stores
*/
const options: MongoClientOptions = {
  directConnection: true,
  connectTimeoutMS: 100,
  socketTimeoutMS: 100,
  waitQueueTimeoutMS: 100,
  heartbeatFrequencyMS: 100,
  keepAlive: true,
  serverSelectionTimeoutMS: 1000,
};

export default class Mongo {
  client: MongoClient;
  db: Db;
  collection: Collection;

  constructor(db: string, collection: string) {
    this.client = new MongoClient(mongoUrl, options);

    this.client.connect((err) => {
      if (err) {
        console.log("Error");
      } else {
        console.log("\t 📜", collection);
      }
    });

    this.db = this.client.db(db);
    this.collection = this.db.collection(collection);

    // this.ping();

    this.client.on("close", () => {
      console.log("Connection dropped");
    });
    this.client.on(`topologyClosed`, () => {
      // process.exit();
      console.log("disconnected");
    });
    this.client.on(`timeout`, () => {
      console.log("timeout");
    });
  }

  // ping() {
  //   try {
  //     setInterval(async () => {
  //       const test = await this.client.db("test").command({ ping: 1 });
  //     }, 1000);
  //   } catch {
  //     process.exit();
  //   }
  // }
}

// TODO add a time out and an error if the mongo connection isnt made within a few seconds
