export const setpoint = async (_: any, { input: { time, temp } }: Args) => {
  console.log(time, temp);
  // await rgbLightStore.findOneAndUpdate({ name: name }, { $set: { red, green, blue } }, options);
};

export interface Args {
  input: {
    time: string;
    temp: number;
  };
}
