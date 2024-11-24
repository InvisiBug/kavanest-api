import { options, timerStore } from "../../database";

//! Not sure if this is used anymore
export default async (_: any, { input }: Args) => {
  const { name, value } = input;

  // console.log(value);

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
