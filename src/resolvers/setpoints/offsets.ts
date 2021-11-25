import { offsetStore, sensorStore, options } from "../../database";

const updateOffset = async (_: any, { input: { room, offset } }: Args) => {
  // return await offsetStore.findOneAndUpdate({ name: "roomOffsets" }, { $set: { livingRoom, kitchen, study, liamsRoom, ourRoom } }, options);
  console.log(room, offset);
  const test = await sensorStore.findOneAndUpdate({ room }, { $set: { offset } }, options);
  console.log(test.value);
  return test.value;
};
export default updateOffset;

export interface Args {
  input: {
    room: string;
    offset: number;
  };
}
