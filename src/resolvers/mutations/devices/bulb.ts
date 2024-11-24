import { rgbLightStore, options } from "../../../database";
import mqtt from "mqtt";
import { mqttUrl } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, brightness, state } }: Args) => {
  switch (name) {
    case "landingLight":
      const topic = "zigbee2mqtt/landingLight/set";

      if (state != undefined) {
        updateZigbeeState(topic, state);
        const zigbeeRGBStrip = await rgbLightStore.findOneAndUpdate({ name }, { $set: { state } }, options);
        return zigbeeRGBStrip.value;
      } else if (brightness != undefined) {
        updateZigbeeBrightness(topic, brightness);
        const zigbeeRGBStrip = await rgbLightStore.findOneAndUpdate({ name }, { $set: { brightness } }, options);
        return zigbeeRGBStrip.value;
      }
  }
};

/*
 * Zigbee Devices
 */
const updateZigbeeState = (topic: string, state: boolean) => {
  client.publish(topic, JSON.stringify({ state: state ? "ON" : "OFF" }));
};

const updateZigbeeBrightness = (topic: string, brightness: number) => {
  client.publish(topic, JSON.stringify({ brightness }));
};

const updateZigbeeRGB = (topic: string, r: number, g: number, b: number) => {
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
