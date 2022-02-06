import { roomStore, options } from "../../../database";

const updateRoom = async (_: any, { input: { room, overrideTime } }: Args) => {
  const data = await roomStore.findOneAndUpdate({ room }, { $set: { overrideTime } }, options);
  return data.value;
};

export default updateRoom;

export interface Args {
  input: {
    room: string;
    overrideTime: number;
  };
}
