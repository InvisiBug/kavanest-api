import mqtt from "mqtt";
import { specialsStore, options } from "../../../database";
import { mqttUrl } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);
const topic: string = "Computer Audio Control";

export default async (_: any, { input }: Args) => {
  const { master, left, right, sub, mixer } = input;

  if (master !== undefined) {
    if (master) {
      client.publish(topic, JSON.stringify(1));

      const computerAudio = await specialsStore.findOneAndUpdate(
        { name: "computerAudio" },
        {
          $set: {
            left: true,
            right: true,
            sub: true,
            mixer: true,
          },
        },
        options
      );

      return computerAudio.value;
    } else {
      client.publish(topic, JSON.stringify(0));

      const computerAudio = await specialsStore.findOneAndUpdate(
        { name: "computerAudio" },
        {
          $set: {
            left: false,
            right: false,
            sub: false,
            mixer: false,
          },
        },
        options
      );

      return computerAudio.value;
    }
  } else {
    // This uses the current state of the device (in mongo) to fill in the gaps from the graphql request
    // i.e. when just the left speaker is included in the request, the other components are taken from the mongo store
    // Updates the mongo store first then uses the response to update the device via MQTT
    const updatedComputerAudio = {
      ...(left != undefined && { left }),
      ...(right != undefined && { right }),
      ...(sub != undefined && { sub }),
      ...(mixer != undefined && { mixer }),
    };

    const computerAudio = await specialsStore.findOneAndUpdate({ name: "computerAudio" }, { $set: updatedComputerAudio }, options);
    const { value } = computerAudio;

    client.publish(
      topic,
      JSON.stringify({
        left: value.left,
        right: value.right,
        sub: value.sub,
        mixer: value.mixer,
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
