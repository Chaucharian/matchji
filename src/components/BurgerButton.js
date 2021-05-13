import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "./Button";

const _styles = StyleSheet.create({
    height: 45
});

export const BurguerButton = ({ onPress, styles }) => {

  return (
    <Button onPress={onPress} styles={_styles}/>
  );
};
