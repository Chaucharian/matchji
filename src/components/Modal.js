import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const _styles = StyleSheet.create({
  container: {
    marginTop: 150,
    zIndex: 10,
    position: "absolute",
    width: 300,
    height: 350,
    borderRadius: 10,
    backgroundColor: "#fdf9ef",
  },
  content: {
  },
});

export const Modal = ({ show, content, styles }) => {
  return (
    <>
      {show && (
        <Animatable.View
          style={[_styles.container, { ...styles }]}
          animation={"bounceInDown"}
          duration={1000}
          onAnimationEnd={() => {}}
        >
          {content}
        </Animatable.View>
      )}
    </>
  );
};
