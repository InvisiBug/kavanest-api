// import { options, radiatorStore } from "../../../database";

// export default async (_: any, { input }: Args) => {
//   const { name, state } = input;

//   const room = await radiatorStore.findOneAndUpdate({ room: name }, { $set: { demand: state } }, options);
//   console.log(room);
//   return room.value;
// };

// export interface Args {
//   input: {
//     name: string;
//     state: boolean;
//   };
// }
