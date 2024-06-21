import { rgbLightStore, options } from "../../../database";
import mqtt from "mqtt";
import { mqttUrl } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

export default async (_: any, { input: { name, red, green, blue, mode, brightness, state } }: Args) => {
  switch (name) {
    case "deskLEDs":
      updateRGB("Desk LED Control", { red, green, blue });
      const deskLEDs = await rgbLightStore.findOneAndUpdate({ name }, { $set: { red, green, blue } }, options);
      return deskLEDs.value;

    case "screenLEDs":
      if (mode != undefined) {
        updateMode("Screen LEDs Control", mode);
        const screenLEDsMode = await rgbLightStore.findOneAndUpdate({ name }, { $set: { mode } }, options);
        return screenLEDsMode.value;
      }

      updateRGB("Screen LEDs Control", { red, green, blue });
      const screenLEDs = await rgbLightStore.findOneAndUpdate({ name }, { $set: { red, green, blue } }, options);
      return screenLEDs.value;

    case "tableLamp":
      if (mode != undefined) {
        updateMode("Table Lamp Control", mode);
        const tableLampMode = await rgbLightStore.findOneAndUpdate({ name }, { $set: { mode } }, options);
        return tableLampMode.value;
      } else {
        updateRGB("Table Lamp Control", { red, green, blue });
        const tabeLamp = await rgbLightStore.findOneAndUpdate({ name }, { $set: { red, green, blue } }, options);
        return tabeLamp.value;
      }

    case "kitchenStrip":
      const topic = "zigbee2mqtt/kitchenStrip/set";

      if (state != undefined) {
        updateZigbeeState(topic, state);
        const zigbeeRGBStrip = await rgbLightStore.findOneAndUpdate({ name }, { $set: { state } }, options);
        return zigbeeRGBStrip.value;
      } else if (brightness != undefined) {
        updateZigbeeBrightness(topic, brightness);
        const zigbeeRGBStrip = await rgbLightStore.findOneAndUpdate({ name }, { $set: { brightness } }, options);
        return zigbeeRGBStrip.value;
      } else {
        updateZigbeeRGB(topic, red, green, blue);
        const zigbeeRGBStrip = await rgbLightStore.findOneAndUpdate({ name }, { $set: { red, green, blue } }, options);
        return zigbeeRGBStrip.value;
      }
  }
};

/*
 * WiFi Devices
 */
const updateRGB = (topic: string, msg: object) => {
  client.publish(topic, JSON.stringify(msg));
};

const updateMode = (topic: string, msg: number) => {
  client.publish(topic, JSON.stringify(msg));
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
    red: number;
    green: number;
    blue: number;
    mode: number;
    brightness: number;
    state: boolean;
  };
}
