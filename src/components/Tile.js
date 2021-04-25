import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";

const _styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "skyblue",
  },
  content: {
    zIndex: -10,
  },
});

export const Tile = ({ content, show, onPress, styles }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Animatable.View
        style={[_styles.container, styles]}
        animation={show ? "bounceIn" : "bounceOut"}
        duration={1000}
      >
        <Text styles={[_styles.content]}>{content}</Text>
      </Animatable.View>
    </TouchableHighlight>
  );
};
