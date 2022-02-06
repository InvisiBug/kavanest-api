import { options, roomStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { name, demand, overrideTime, disabled } = input;

  let newOverrideTime: number;
  if (overrideTime) {
    newOverrideTime = offsetTimeMins(overrideTime);
  }
  console.log(input);

  const room = await roomStore.findOneAndUpdate({ room: name }, { $set: { demand, overrideTime: newOverrideTime, disabled } }, options);
  return room.value;
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
