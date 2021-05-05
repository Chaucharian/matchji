import React from "react";
import { Alert } from "react-native";

export const CustomAlert = ({ title, subtitle, onOk, ...props }) => {
  Alert.alert(title, subtitle, [
    { text: "OK", onPress: () => onOk() },
    { ...props },
  ]);
};
