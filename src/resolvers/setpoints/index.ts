import { setpointsStore, options } from "../../database";

/*
  Look for a some current setpoints
    If there isnt one, create a new one and save incoming values
    If there is one, grab it, add the new setpoint, sort the resulting array in time order, return the time ordered array
*/
export const updateSetpoint = async (_: any, { input: { room, time, temp } }: Args) => {
  const currentRoom = await setpointsStore.findOne({ room });

  if (!currentRoom) {
    const response = await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints: { [time]: temp } } }, options);
    return response.value;
  }

  const newSetpoints = {
    ...currentRoom.setpoints,
    [time]: temp,
  };

  const newOrder: any = Object.keys(newSetpoints)
    .sort()
    .reduce((obj, key) => {
      obj[key] = newSetpoints[key];
      return obj;
    }, {});

  return await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints: newOrder } }, options);
};

/*
  Grab the setpoints for the required room
  Delete the stated setpoint
  Save the new setpoints
*/
export const deleteSetpoint = async (_: any, { input: { room, time } }: Args) => {
  const currentRoom = await setpointsStore.findOne({ room });
  const setpoints = currentRoom.setpoints;

  delete setpoints[time];

  return await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints } }, options);
};

export interface Args {
  input: {
    room: String;
    time: string;
    temp: number;
  };
}
