import { sensorStore, options } from "../../../database";

const updateOffset = async (_: any, { input: { room, offset } }: Args) => {
  const data = await sensorStore.findOneAndUpdate({ room }, { $set: { offset } }, options);
  return data.value;
};

export default updateOffset;

export interface Args {
  input: {
    room: string;
    offset: number;
  };
}
