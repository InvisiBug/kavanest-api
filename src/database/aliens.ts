import mongoose from "mongoose";

const options = {
  // useUnifiedTopology: true,
  autoReconnect: true,
};
// Mongo Connection
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/aliens");
const conn = mongoose.createConnection("mongodb://localhost:27017/aliens");

const aliensSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  palnet: { type: String },
});

const Aliens = conn.model("aliens", aliensSchema);

export default Aliens;
