import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "./Button";

const _styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,    
    },  
    container: {
        fontWeight: "bold",
        fontSize: 30
    }
});

export const CloseButton = ({ onPress, styles }) => {

  return (
    <Button onPress={onPress} styles={{ ..._styles.button, ...styles}} >
        <Text style={[_styles.container]}>X</Text>
    </Button>
  );
};
