import { options, roomStore } from "../../database";
import { offsetTimeMins } from "../../helpers";

// types; "heating-on", "heating-off", "passive"
export default async (_: any, { input }: Args) => {
  const { name, demand, overrideTime, overrideType, deadzone, setpoints } = input;

  let updatedSetpoints: Args["input"]["setpoints"];
  if (setpoints) {
    updatedSetpoints = await handleSetpoints({
      name,
      day: setpoints.day,
      time: setpoints.time,
      temp: setpoints.values.temp,
      type: setpoints.values.type || "on",
    });
    console.log(updatedSetpoints);
  }

  let newOverrideTime: number;
  if (overrideTime) {
    newOverrideTime = offsetTimeMins(overrideTime);
  }

  const updatedRoom = {
    ...(demand != undefined && { demand: input?.demand }),
    ...(overrideTime != undefined && { overrideTime: newOverrideTime }),
    ...(overrideType != undefined && { overrideType: overrideType }),
    ...(deadzone != undefined && { deadzone: input?.deadzone }),
    ...(updatedSetpoints != undefined && { setpoints: updatedSetpoints }),
  };

  const { value } = await roomStore.findOneAndUpdate({ name }, { $set: updatedRoom }, options);
  return value;
  // return null;
};

export interface Args {
  input: {
    name: string;
    demand?: "on" | "off" | "passive";
    overrideTime?: number;
    overrideType?: string;
    deadzone?: number;
    setpoints?: {
      day: string;
      time: string;
      values: {
        temp: number;
        type: string;
      };
    };
  };
}

const handleSetpoints = async ({ name, day, time, temp, type }: { name: string; day: string; time: string; temp: number; type: string }) => {
  // Look for an existing entry
  const currentRoom = await roomStore.findOne({ name });

  let updatedSetpoints: any;

  // does the existing room have any setpoints
  // If not, create one and return it
  if (!currentRoom || !currentRoom.setpoints) {
    const newSetpoints = {
      [day]: {
        [time]: {
          temp,
          type,
        },
      },
    };
    return newSetpoints;
  } else {
    // Create an object of all the setpoints, with the new one on the end
    updatedSetpoints = {
      ...currentRoom.setpoints[day],
      [time]: {
        temp,
        type,
      },
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
