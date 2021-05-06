import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TILE_MOUNT_ANIMATION_DURATION } from "../const/variables";

const _styles = StyleSheet.create({
  container: {},
  tile: {
    zIndex: 1,
    // backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    elevation: 4
    // borderColor: "skyblue",
  },
  unmountTile: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  emptyTile: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "skyblue",
  },
  content: {
    fontSize: 45, // calculate size base on tile size
  },
});

const animationTypes = { in: "bounceIn", out: "bounceOut" };

export const Tile = ({
  content,
  show,
  unmount,
  animationDuration = 500,
  onPress,
  styles,
}) => {

  const getFontSize = (styles) => styles.width <= 50 ? 25 : 45;

  return (
    <>
      {show ? (
        <TouchableHighlight onPress={onPress}>
          <Animatable.View
            style={[_styles.emptyTile, { ...styles }]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          >
            <Text style={[_styles.content, { fontSize: getFontSize(styles) }]}>{content}</Text>
          </Animatable.View>
        </TouchableHighlight>
      ) : unmount ? (
        <TouchableHighlight onPress={onPress}>
          <Animatable.View
            style={[_styles.unmountTile, styles.unmountTile]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          ></Animatable.View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={[_styles.container, styles.container]}
          onPress={onPress}
        >
          <Animatable.View
            style={[_styles.tile, { ...styles }]}
            animation={animationTypes.in}
            duration={animationDuration}
            onAnimationEnd={() => {}}
          ></Animatable.View>
        </TouchableHighlight>
      )}
    </>
  );
};
