import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
var myEnv = dotenv.config();
dotenvExpand(myEnv);

export const mongoUrl = String(process.env.MONGO);
export const mqttUrl = String(process.env.MQTT);
