import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "./Button";

const _styles = StyleSheet.create({
  button: {
    width: 40,
    height: 45
    
  }
});

export const PauseButton = ({ onPress, styles }) => {

  return (
    <Button onPress={onPress} styles={{ ..._styles.button, ...styles }}/>
  );
};
