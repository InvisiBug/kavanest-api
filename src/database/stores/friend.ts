import mongoose from "mongoose";
import { Friend } from "../schemas";

const URI = process.env.URI ?? "";

export const friendConnection = mongoose.createConnection(URI);
export const FriendStore = friendConnection.model("friend", Friend);

friendConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + "mongodb://localhost:27017");
});

friendConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});
