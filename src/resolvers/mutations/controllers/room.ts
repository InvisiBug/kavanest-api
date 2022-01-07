import { options, roomStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { name, state } = input;

  const room = await roomStore.findOneAndUpdate({ room: name }, { $set: { demand: state } }, options);
  return room.value;
};

export interface Args {
  input: {
    name: string;
    state: boolean;
  };
}
