import { plugStore, options } from "../../../database";
import mqtt from "mqtt";
import { mqttUrl } from "../../../helpers";
require("dotenv").config();

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, state } }: Args) => {
  switch (name) {
    case "floodlight":
      toggle(state, "Plug Control", "1", "0");
      const floodlight = await plugStore.findOneAndUpdate({ name: name }, { $set: { state: state } }, options);
      return floodlight.value;

    case "sun":
      toggle(state, "Sun Control", "1", "0");
      const sun = await plugStore.findOneAndUpdate({ name: name }, { $set: { state: state } }, options);
      return sun.value;

    case "heating":
      toggle(state, "Heating Control", "1", "0");
      const heating = await plugStore.findOneAndUpdate({ name: name }, { $set: { state: state } }, options);
      return heating.value;

    case "radiatorFan":
      toggle(state, "Radiator Fan Control", "1", "0");
      const radiatorFan = await plugStore.findOneAndUpdate({ name: name }, { $set: { state: state } }, options);
      return radiatorFan.value;
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
  input: {
    name: string;
    state: boolean;
  };
}
