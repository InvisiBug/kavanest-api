import mongoose from "mongoose";
import { Friend } from "../schemas";

export const friendConnection = mongoose.createConnection("mongodb://localhost:27017/friend");
export const FriendStore = friendConnection.model("friend", Friend);

friendConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + "mongodb://localhost:27017");
});

friendConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});
