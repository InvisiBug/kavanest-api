import e from "express";
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

  // console.log(name, updatedRoom);

  const data = await roomStore.findOneAndUpdate({ name }, { $set: updatedRoom }, options);
  return data.value;
};

const handleSetpoints = async (name: string, day: string, time: string, temp: string) => {
  const currentRoom = await roomStore.findOne({ name });

  let updatedSetpoints: any;

  if (!currentRoom.setpoints) {
    console.log("no setpoints found");
    const newSetpoints = {
      [day]: {
        [time]: temp,
      },
    };
    return newSetpoints;
  } else {
    console.log("Setpoints found");
    updatedSetpoints = {
      ...currentRoom.setpoints[day],
      [time]: temp,
    };
  }

  const newOrder: any = Object.keys(updatedSetpoints)
    .sort()
    .reduce((obj, key) => {
      obj[key] = updatedSetpoints[key];
      return obj;
    }, {});

  // // Add the new ordered setpoints to a clone of the original setpoints object
  updatedSetpoints = {
    ...currentRoom.setpoints,
    [day]: newOrder,
  };

  console.log(updatedSetpoints);
  return updatedSetpoints;

  // console.log(updatedSetpoints);
};

export interface Args {
  input: {
    name: string;
    demand?: boolean;
    overrideTime?: number;
    disabled?: boolean;
  };
}
