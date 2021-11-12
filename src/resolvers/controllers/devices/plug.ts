import { plugStore, options } from "kavanest-store";

import mqtt from "mqtt";
require("dotenv").config();

const MQTT: string = process.env.MQTT ?? "";

let client: mqtt.MqttClient = mqtt.connect(MQTT);

export default async (_: any, { input: { name, state } }: Args) => {
  switch (name) {
    case "floodlight":
      toggle(state, "Plug Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: name }, { state: state }, options);

    case "sun":
      toggle(state, "Sun Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: name }, { state: state }, options);

    case "heating":
      toggle(state, "Heating Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: name }, { state: state }, options);

    case "radiatorFan":
      toggle(state, "Radiator Fan Control", "1", "0");
      return await plugStore.findOneAndUpdate({ name: name }, { state: state }, options);
  }
};

const toggle = (state: boolean, topic: string, trueMsg: string, falseMsg: string) => {
  if (state) {
    client.publish(topic, trueMsg);
  } else {
    client.publish(topic, falseMsg);
  }
};

export interface Args {
  input: Input;
}

type Input = {
  name: string;
  state: boolean;
};
