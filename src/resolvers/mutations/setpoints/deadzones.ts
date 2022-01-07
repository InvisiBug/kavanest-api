import { setpointsStore, options } from "../../../database";

const undateDeadzone = async (_: any, { input: { room, deadzone } }: Args) => {
  const data = await setpointsStore.findOneAndUpdate({ room }, { $set: { deadzone } }, options);
  return data.value;
};

export default undateDeadzone;

export interface Args {
  input: {
    room: String;
    deadzone: string;
  };
}
