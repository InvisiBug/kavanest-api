import { options, roomStore } from "../../../database";

export default async (_: any, { input }: Args) => {
  const { name, demand, overrideTime, disabled } = input;

  let newOverrideTime: number;
  if (overrideTime) {
    newOverrideTime = offsetTimeMins(overrideTime);
  }

  const updatedRoom = {
    ...(demand != undefined && { demand: input?.demand }),
    ...(disabled != undefined && { disabled: input?.disabled }),
    ...(overrideTime != undefined && { overrideTime: newOverrideTime }),
  };

  // console.log(name, updatedRoom);

  const data = await roomStore.findOneAndUpdate({ name }, { $set: updatedRoom }, options);
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
