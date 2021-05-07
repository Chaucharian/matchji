import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import * as Animatable from "react-native-animatable";

const _styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#5c5c5c9c",
  },
  modal: {
    marginTop: 150,
    zIndex: 10,
    position: "absolute",
    width: 320,
    height: 350,
    borderRadius: 10,
    backgroundColor: "#fdf9ef",
  },
  content: {},
});

export const Modal = ({ show, content, onPress, styles }) => {
  return (
    <>
      {show && (
        <Animatable.View
          style={[_styles.container, { ...styles }]}
          animation={"fadeIn"}
          duration={1000}
          onAnimationEnd={() => {}}
        >
          <Animatable.View
            style={[_styles.modal, { ...styles }]}
            animation={"bounceInDown"}
            duration={1000}
            onAnimationEnd={() => {}}
          >
              <Button title="CERRAR" onPress={onPress} ></Button>
            {content}
          </Animatable.View>
        </Animatable.View>
      )}
    </>
  );
};
