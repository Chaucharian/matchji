import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import { useGameContext } from "../context/game";
// import { useModalContext } from "../context/modal";
import { IconButton } from "./IconButton";

export const Controls = ({ onMusicMute, onSoundMute, onDark }) => {

  return (
    <View style={[_styles.container]}>
    <View style={[_styles.buttonContainer]}>
        <IconButton onPress={onMusicMute} />
        <IconButton onPress={onSoundMute} />
        <IconButton onPress={onDark} />
      </View>
      </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }, 
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-around",
  }
});
