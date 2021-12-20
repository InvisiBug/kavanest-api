import { setpointsStore, options } from "../../database";

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
