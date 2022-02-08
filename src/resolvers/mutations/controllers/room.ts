import { options, roomStore } from "../../../database";
import { offsetTimeMins } from "../../../helpers";

export default async (_: any, { input }: any) => {
  const { name, demand, overrideTime, disabled, deadzone, setpoints } = input;
  let day: string, time: string, temp: string;

  let updatedSetpoints: any;
  if (setpoints) {
    day = setpoints.day;
    time = setpoints.time;
    temp = setpoints.temp;

    updatedSetpoints = await handleSetpoints(name, day, time, temp);
  }

  let newOverrideTime: number;
  if (overrideTime) {
    newOverrideTime = offsetTimeMins(overrideTime);
  }

  const updatedRoom = {
    ...(demand != undefined && { demand: input?.demand }),
    ...(disabled != undefined && { disabled: input?.disabled }),
    ...(overrideTime != undefined && { overrideTime: newOverrideTime }),
    ...(deadzone != undefined && { deadzone: input?.deadzone }),
    ...(updatedSetpoints != undefined && { setpoints: updatedSetpoints }),
  };

  const data = await roomStore.findOneAndUpdate({ name }, { $set: updatedRoom }, options);
  return data.value;
};

const handleSetpoints = async (name: string, day: string, time: string, temp: string) => {
  // Look for an existing entry
  const currentRoom = await roomStore.findOne({ name });

  let updatedSetpoints: any;

  // does the existing room have any setpoints
  // If not, create one and return it
  if (!currentRoom.setpoints) {
    const newSetpoints = {
      [day]: {
        [time]: temp,
      },
    };
    return newSetpoints;
  } else {
    // Create an object of all the setpoints, with the new one on the end
    updatedSetpoints = {
      ...currentRoom.setpoints[day],
      [time]: temp,
    };
  }

  // Order the new setpoints by time
  const newOrder: any = Object.keys(updatedSetpoints)
    .sort()
    .reduce((obj, key) => {
      obj[key] = updatedSetpoints[key];
      return obj;
    }, {});

  // Add the new ordered setpoints to a clone of the original setpoints object
  updatedSetpoints = {
    ...currentRoom.setpoints,
    [day]: newOrder,
  };

  // Return the new setpoints object
  return updatedSetpoints;
};

export interface Args {
  input: {
    name: string;
    demand?: boolean;
    overrideTime?: number;
    disabled?: boolean;
  };
}
