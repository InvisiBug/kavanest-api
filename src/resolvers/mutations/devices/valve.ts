import { valveStore, options } from "../../../database";
import mqtt from "mqtt";
import { mqttUrl, decamelize } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input }: Args) => {
  const { name, state } = input;

  toggle(state, `${decamelize(name)} Valve Control`, "1", "0");
  const valve = await valveStore.findOneAndUpdate({ room: name }, { $set: { state } }, options);
  return valve.value;
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
