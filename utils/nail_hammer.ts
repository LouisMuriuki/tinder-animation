import { Vibration } from "react-native";

export const vibrate = () => {
  Vibration.vibrate(10, false);
};
