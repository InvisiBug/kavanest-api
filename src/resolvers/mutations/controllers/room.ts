import { options, roomStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { name, demand, overrideTime, disabled } = input;

  console.log(input);

  let newOverrideTime: number;
  if (overrideTime) {
    newOverrideTime = offsetTimeMins(overrideTime);
  }

  const data = await roomStore.findOneAndUpdate({ name }, { $set: { demand, overrideTime: newOverrideTime, disabled } }, options);
  console.log(data.value);
  return data.value;
};

export interface Args {
  input: {
    name: string;
    demand?: boolean;
    overrideTime?: number;
    disabled?: boolean;
  };
}

const offsetTimeMins = (addedTime = 0) => {
  let now = new Date();
  return now.setMinutes(now.getMinutes() + addedTime);
};
