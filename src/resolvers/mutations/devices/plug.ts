import mqtt from "mqtt";
import { plugStore, options } from "../../../database";
import { mqttUrl, decamelize } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

const zigbeePlugs = ["livingRoomLamp", "eggChair", "trainingRoomLamp", "kitchenLamp"];

export default async (_: any, { input: { name, state } }: Args) => {
  if (zigbeePlugs.includes(name)) {
    client.publish(`zigbee2mqtt/${name}/set`, JSON.stringify({ state: state ? "ON" : "OFF" })); // intentionally lower case for on and
  } else {
    client.publish(`${decamelize(name)} Control`, state ? "1" : "0");
  }

  const { value } = await plugStore.findOneAndUpdate({ name }, { $set: { state } }, options);

  return value;
};

export interface Args {
  input: {
    name: string;
    state: boolean;
  };
}
