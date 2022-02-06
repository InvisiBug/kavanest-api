import { options, timerStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { name, value } = input;

  const timers = await timerStore.findOneAndUpdate({ name }, { $set: { value: offsetTimeMins(value) } }, options);
  return timers.value;
};

export interface Args {
  input: {
    name: string;
    value: number;
  };
}

const offsetTimeMins = (addedTime = 0) => {
  let now = new Date();
  return now.setMinutes(now.getMinutes() + addedTime);
};
