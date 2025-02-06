import { options, motionStore } from "../../database";

export default async (_: any, { input }: Args) => {
  const { name, motionTriggered, armed, allLights } = input;

  // console.log(value);

  console.log(input);

  const updatedMotionController = {
    ...(motionTriggered !== undefined && { motionTriggered }),
    ...(armed !== undefined && { armed }),
    ...(allLights !== undefined && { allLights }),
  };

  const timers = await motionStore.findOneAndUpdate({ name }, { $set: updatedMotionController }, options);
  return timers.value;
};

export interface Args {
  input: {
    name: string;
    motionTriggered: boolean;
    armed: boolean;
    allLights: boolean;
  };
}
