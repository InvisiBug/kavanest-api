import { Collection, Db, MongoClient } from "mongodb";

export let events: Collection;

export const connectToDB = async (uri: string, database: string, collection: string) => {
  const client: MongoClient = new MongoClient(uri);

  await client.connect();

  const db: Db = client.db(database);
  const eventsCollection: Collection = db.collection(collection);

  // Persist the connection
  events = eventsCollection;

  console.log(`🖊️ Successfully connected to database: ${db.databaseName} and collection: ${eventsCollection.collectionName}`);
};
