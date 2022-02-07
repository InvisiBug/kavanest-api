import { setpointsStore, options, roomStore } from "../../../database";

/*
  Grab the setpoints for the required room
  Delete the stated setpoint
  Save the new setpoints
*/
export const deleteSetpoint = async (_: any, { input: { name, day, time } }: any) => {
  const currentRoom = await roomStore.findOne({ name });
  const setpoints = currentRoom?.setpoints;

  delete setpoints[day][time];

  const data = await roomStore.findOneAndUpdate({ name }, { $set: { setpoints } }, options);
  return data.value;
};

export interface Args {
  input: {
    room: string;
    day: string;
    time: string;
    temp: number;
  };
}
