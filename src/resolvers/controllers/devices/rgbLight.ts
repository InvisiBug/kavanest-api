import { rgbLightStore, options } from "../../../database";
import mqtt from "mqtt";
require("dotenv").config();

let client: mqtt.MqttClient = mqtt.connect(process.env.MQTT ?? "");

export default async (_: any, { input: { name, red, green, blue, mode } }: Args) => {
  switch (name) {
    case "deskLEDs":
      updateRGB("Desk LED Control", { red, green, blue });
      return await rgbLightStore.findOneAndUpdate({ name: name }, { red, green, blue }, options);

    case "screenLEDs":
      if (mode != undefined) {
        updateMode("Screen LEDs Control", mode);
        return await rgbLightStore.findOneAndUpdate({ name: name }, { mode }, options);
      }

      updateRGB("Screen LEDs Control", { red, green, blue });
      return await rgbLightStore.findOneAndUpdate({ name: name }, { red, green, blue }, options);

    case "tableLamp":
      updateRGB("Table Lamp Control", { red, green, blue });
      return await rgbLightStore.findOneAndUpdate({ name: name }, { red, green, blue }, options);
  }
};

const updateRGB = (topic: string, msg: object) => {
  client.publish(topic, JSON.stringify(msg));
};

const updateMode = (topic: string, msg: number) => {
  client.publish(topic, JSON.stringify(msg));
};

export interface Args {
  input: Input;
}

type Input = {
  name: string;
  red: number;
  green: number;
  blue: number;
  mode: number;
};
