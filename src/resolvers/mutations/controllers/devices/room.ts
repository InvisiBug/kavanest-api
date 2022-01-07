import { plugStore, options, roomStore } from "../../../../database";
import mqtt from "mqtt";
import { mqttUrl } from "../../../../helpers";

export default async (_: any, { input }: Args) => {
  const { name, state } = input;

  console.log(input);

  const room = await roomStore.findOneAndUpdate({ room: name }, { $set: { demand: state } }, options);
  console.log(room);
  return room.value;
};

export interface Args {
  input: {
    name: string;
    state: boolean;
  };
}
