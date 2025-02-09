import { bulbStore, options } from "@/database";
import mqtt from "mqtt";
import { mqttUrl } from "@/helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, brightness, state } }: Args) => {
  const topic = `zigbee2mqtt/${name}/set`;

  if (state != undefined) {
    updateState(topic, state);
    const { value } = await bulbStore.findOneAndUpdate({ name }, { $set: { state } }, options);

    return value;
  } else if (brightness != undefined) {
    updateBrightness(topic, brightness);
    const { value } = await bulbStore.findOneAndUpdate({ name }, { $set: { brightness } }, options);

    return value;
  }
};

/*
 * Zigbee Devices
 */
const updateState = (topic: string, state: boolean) => {
  client.publish(topic, JSON.stringify({ state: state ? "ON" : "OFF" }));
};

const updateBrightness = (topic: string, brightness: number) => {
  client.publish(topic, JSON.stringify({ brightness }));
};

const updateRGB = (topic: string, r: number, g: number, b: number) => {
  // console.log(JSON.stringify({ color: { rgb: `${r},${g},${b}` } }));
  client.publish(topic, JSON.stringify({ color: { rgb: `${r},${g},${b}` } }));
};

// TODO: I think these can be undefined or number, Check this
export interface Args {
  input: {
    name: string;
    brightness: number;
    state: boolean;
  };
}
