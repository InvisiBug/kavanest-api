import { setpointsStore, options } from "../../database";

export const updateSetpoint = async (_: any, { input: { room, time, temp } }: Args) => {
  const currentRoom = await setpointsStore.findOne({ room });

  if (!currentRoom) {
    const response = await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints: { [time]: temp } } }, options);
    return response.value;
  }

  // TODO, Figure how to add this ordering to the get all setpoints request
  const ordered: any = Object.keys(currentRoom.setpoints)
    .sort()
    .reduce((obj, key) => {
      obj[key] = currentRoom.setpoints[key];
      return obj;
    }, {});

  console.log(ordered);

  const updatedSetpoints = {
    ...ordered,
    [time]: temp,
  };

  const response = await setpointsStore.findOneAndUpdate({ room }, { $set: { setpoints: updatedSetpoints } }, options);
  return response.value;
};

export interface Args {
  input: {
    room: String;
    time: string;
    temp: number;
  };
}
