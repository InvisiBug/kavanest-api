import { options, timerStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { timer, value } = input;

  const room = await timerStore.findOneAndUpdate({ timer }, { $set: { value } }, options);
  console.log(room);
  return room.value;
};

export interface Args {
  input: {
    timer: string;
    value: number;
  };
}
