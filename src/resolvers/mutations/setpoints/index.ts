import { setpointsStore, options } from "../../../database";

/*
  Look for a some current setpoints
    If there isnt one, create a new one and save incoming values
    If there is one, grab it, add the new setpoint, sort the resulting array in time order, return the time ordered array
*/
export const updateSetpoint = async (_: any, { input: { room, day, time, temp } }: Args) => {
  // console.log(room, day, time, temp);
  // Look for an existing entry
  const currentRoom = await setpointsStore.findOne({ room: room });

  // does the existing room have any setpoints
  // If not, create one and return it
  if (!currentRoom || !currentRoom.setpoints) {
    const response = await setpointsStore.findOneAndUpdate(
      { room },
      {
        $set: {
          setpoints: {
            [day]: {
              [time]: temp,
            },
          },
        },
      },
      options
    );
    return response.value;
  }

  // Create an object of all the setpoints, with the new one on the end
  const newSetpoints = {
    ...currentRoom.setpoints[day],
    [time]: temp,
  };

  // Order the new setpoints by time
  const newOrder: any = Object.keys(newSetpoints)
    .sort()
    .reduce((obj, key) => {
      obj[key] = newSetpoints[key];
      return obj;
    }, {});

  // Add the new ordered setpoints to a clone of the original setpoints object
  const updatedSetpoints = {
    ...currentRoom.setpoints,
    [day]: newOrder,
  };

  // Save the new setpoints object
  const data = await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints: updatedSetpoints } }, options);
  console.log("Setting setpoints", data.value);
  return data.value;
};

/*
  Grab the setpoints for the required room
  Delete the stated setpoint
  Save the new setpoints
*/
export const deleteSetpoint = async (_: any, { input: { room, day, time } }: Args) => {
  const currentRoom = await setpointsStore.findOne({ room });
  const setpoints = currentRoom.setpoints;

  delete setpoints[day][time];

  const data = await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints } }, options);
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
