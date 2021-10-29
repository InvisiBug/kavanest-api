import mongoose from "mongoose";
import { Alien } from "../schemas";

export const alienConnection = mongoose.createConnection("mongodb://localhost:27017/alien");
export const AlienStore = alienConnection.model("aliens", Alien);

alienConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + "mongodb://localhost:27017/alien");
});

alienConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});
