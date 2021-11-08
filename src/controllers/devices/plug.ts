import { plugStore, options } from "../../database";
import mqtt from "mqtt";
require("dotenv").config();

const MQTT: string = process.env.MQTT ?? "";

let client: mqtt.MqttClient = mqtt.connect(MQTT);

export default async (_: any, { input }) => {
  switch (input.name) {
    case "floodlight":
      toggle(input.state, "Plug Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: input.name }, { state: input.state }, options);

    case "sun":
      toggle(input.state, "Sun Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: input.name }, { state: input.state }, options);

    case "heating":
      toggle(input.state, "Heating Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: input.name }, { state: input.state }, options);

    case "radiatorFan":
      toggle(input.state, "Radiator Fan Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: input.name }, { state: input.state }, options);
  }
};

const toggle = (state: boolean, topic: string, trueMsg: string, falseMsg: string) => {
  if (state) {
    client.publish(topic, trueMsg);
  } else {
    client.publish(topic, falseMsg);
  }
};
