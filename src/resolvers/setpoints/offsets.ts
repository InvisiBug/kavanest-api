import { offsetStore, options } from "kavanest-store";
const offsets = async (_: any, { input: { livingRoom, kitchen, liamsRoom, study, ourRoom } }: Args) => {
  return await offsetStore.findOneAndUpdate({ name: "roomOffsets" }, { livingRoom, kitchen, study, liamsRoom, ourRoom }, options);
};
export default offsets;

export interface Args {
  input: Input;
}

interface Input {
  livingRoom: number;
  kitchen: number;
  liamsRoom: number;
  study: number;
  ourRoom: number;
}
