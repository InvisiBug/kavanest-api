export { log } from "./components/log";
export { mqttUrl, mongoUrl } from "./components/urlGenerator";

export const decamelize = (text: string) => {
  if (!text) return "Unknown Name, probs something wrong with mongo";
  const result = text.replace(/([A-Z]{1,})/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const offsetTimeMins = (addedTime = 0) => {
  let now = new Date();
  // return now.setMinutes(now.getMinutes() + addedTime);

  let newTime = now.getTime() + addedTime * 60000;
  return newTime;
};
