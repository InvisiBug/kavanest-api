import { rgbLightStore, options } from "../../../../database";
import mqtt from "mqtt";
import { mqttUrl } from "../../../../helpers";
require("dotenv").config();

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, red, green, blue, mode } }: Args) => {
  switch (name) {
    case "deskLEDs":
      updateRGB("Desk LED Control", { red, green, blue });
      const deskLEDs = await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { red, green, blue } }, options);
      return deskLEDs.value;

    case "screenLEDs":
      if (mode != undefined) {
        updateMode("Screen LEDs Control", mode);
        const screenLEDsMode = await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { mode } }, options);
        return screenLEDsMode.value;
      }

      updateRGB("Screen LEDs Control", { red, green, blue });
      const screenLEDs = await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { red, green, blue } }, options);
      return screenLEDs.value;

    case "tableLamp":
      if (mode != undefined) {
        updateMode("Table Lamp Control", mode);
        const tableLampMode = await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { mode } }, options);
        return tableLampMode.value;
      } else {
        updateRGB("Table Lamp Control", { red, green, blue });
        const tabeLamp = await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { red, green, blue } }, options);
        return tabeLamp.value;
      }
  }
};

const updateRGB = (topic: string, msg: object) => {
  client.publish(topic, JSON.stringify(msg));
};

const updateMode = (topic: string, msg: number) => {
  client.publish(topic, JSON.stringify(msg));
};

export interface Args {
  input: {
    name: string;
    red: number;
    green: number;
    blue: number;
    mode: number;
  };
}
