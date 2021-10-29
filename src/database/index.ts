import mongoose from "mongoose";
import { Aliens, Friends } from "./schemas";
require("dotenv").config();

const connection = mongoose.createConnection("mongodb://localhost:27017/friends");

connection.on("connected", () => {
  console.log("Mongoose connected to " + "mongodb://localhost:27017/friends");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error" + err);
});

export const AliensStore = connection.model("aliens", Aliens);
export const FriendsStore = connection.model("aliens", Friends);

// export { default as Friends } from "./schemas/friends";
// export { default as Aliens } from "./schemas/aliens";

export const options = { new: true, upsert: true };

export default class FriendClass {
  id: String;
  firstName: String;
  lastName: String;
  gender: String;
  email: String;
  age: Number;
  contacts: any;

  constructor(id: String, { firstName, lastName, gender, email, age, contacts }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.age = age;
    this.contacts = contacts;
  }
}
