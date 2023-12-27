import { radiatorStore, options } from "../../../database";
import mqtt from "mqtt";
import { mqttUrl, decamelize } from "../../../helpers";

let client: mqtt.MqttClient = mqtt.connect(mqttUrl);

// This updates the mongo store then uses the response to update the device
export default async (_: any, { input }: Args) => {
  const { name, valve, fan } = input;

  const updatedRadiator = {
    ...(valve != undefined && { valve: input?.valve }),
    ...(fan != undefined && { fan: input?.fan }),
  };

  const data = await radiatorStore.findOneAndUpdate({ name }, { $set: updatedRadiator }, options);
  const { value } = data;

  //* Every room in this if has one of the fancy new radiator controllers
  if (name === "study" || name == "livingRoom") {
    // Nasty hack to make the current valves still work
    client.publish(
      `${decamelize(name)} Radiator Control`,
      JSON.stringify({
        valve: value.valve,
        fan: value.fan,
      })
    );
  } else {
    client.publish(`${decamelize(name)} Valve Control`, value.valve ? "1" : "0");
  }

  return value;
};

export interface Args {
  input: {
    name: string;
    valve?: boolean;
    fan?: boolean;
  };
}
