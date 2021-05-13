import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "./Button";

const _styles = StyleSheet.create({
    container: {
        fontWeight: "bold",
        fontSize: 30
    }
});

export const CloseButton = ({ onPress, styles }) => {

  return (
    <Button onPress={onPress} >
        <Text style={[_styles.container]}>X</Text>
    </Button>
  );
};
