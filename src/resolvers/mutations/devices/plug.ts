import mqtt from "mqtt";
import { plugStore, options } from "../../../database";
import { mqttUrl, decamelize } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, state } }: Args) => {
  if (name !== "livingroomLamp") {
    toggle(state, `${decamelize(name)} Control`, "1", "0");
  } else {
    client.publish(`zigbee2mqtt/${name}/set`, `{"state":${state ? JSON.stringify("on") : JSON.stringify("off")}}`);
  }

  const plug = await plugStore.findOneAndUpdate({ name }, { $set: { state } }, options);

  return plug.value;
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
