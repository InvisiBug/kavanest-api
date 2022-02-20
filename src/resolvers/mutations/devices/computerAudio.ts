import mqtt from "mqtt";
import { specialsStore, options } from "../../../database";
import { mqttUrl } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);
const topic: string = "Computer Audio Control";

export default async (_: any, { input: { master, left, right, sub, mixer } }: Args) => {
  if (master !== undefined) {
    if (master) {
      client.publish(topic, JSON.stringify(1));

      const computerAudio = await specialsStore.findOneAndUpdate(
        { name: "computerAudio" },
        { $set: { left: true, right: true, sub: true, mixer: true } },
        options
      );
      return computerAudio.value;
    } else {
      client.publish(topic, JSON.stringify(0));

      const computerAudio = await specialsStore.findOneAndUpdate(
        { name: "computerAudio" },
        { $set: { left: false, right: false, sub: false, mixer: false } },
        options
      );
      return computerAudio.value;
    }
  } else {
    const computerAudio = await specialsStore.findOneAndUpdate({ name: "computerAudio" }, { $set: { left, right, sub, mixer } }, options);

    client.publish(
      topic,
      JSON.stringify({
        Left: left,
        Right: right,
        Sub: sub,
        Mixer: mixer,
      })
    );
    return computerAudio.value;
  }
};

export interface Args {
  input: {
    master: boolean;
    left: boolean;
    right: boolean;
    sub: boolean;
    mixer: boolean;
  };
}
