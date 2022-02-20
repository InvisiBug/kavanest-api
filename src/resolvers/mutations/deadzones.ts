import { setpointsStore, options } from "../../database";

export default async (_: any, { input: { room, deadzone } }: Args) => {
  const data = await setpointsStore.findOneAndUpdate({ room }, { $set: { deadzone } }, options);
  return data.value;
};

export interface Args {
  input: {
    room: String;
    deadzone: string;
  };
}
