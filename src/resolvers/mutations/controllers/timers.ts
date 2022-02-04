import { options, timerStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { timer, value } = input;

  const room = await timerStore.findOneAndUpdate({ timer }, { $set: { value: offsetTimeMins(value) } }, options);
  return room.value;
};

export interface Args {
  input: {
    timer: string;
    value: number;
  };
}

const offsetTimeMins = (addedTime = 0) => {
  let now = new Date();
  return now.setMinutes(now.getMinutes() + addedTime);
};
