import mongoose from "mongoose";
import { Alien } from "../schemas";
require("dotenv").config();

const URI = process.env.URI ?? "";

export const alienConnection = mongoose.createConnection(URI);
export const AlienStore = alienConnection.model("aliens", Alien);

alienConnection.on("connected", () => {
  console.log("🔗 Mongoose connected to " + URI);
});

alienConnection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});
