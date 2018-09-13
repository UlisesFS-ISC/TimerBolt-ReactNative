import { Alert } from "react-native";

export const serviceCallAlert = data => {
  let { success, msg } = data;
  let msgHeader = success ? "Success" : "Error";
  return Alert.alert(msgHeader, msg);
};