import React from "react";
import { StyleSheet, View } from "react-native";
import { useGeneralContext } from "../context/general";
import { useTheme } from "../context/theme/themeContext";
import { IconButton } from "./IconButton";

export const Controls = () => {
   const { state: { isMusicMute, isSoundMute }, dispatch: { muteMusic, muteSound } } = useGeneralContext();
   const { state: { dark, primary }, dispatch: { changeTheme } } = useTheme();

  return (
    <View style={[_styles.container]}>
    <View style={[_styles.buttonContainer]}>
        <IconButton color={dark ? "#FFF" : "#000"} type={isMusicMute ? "music-note" : "music-off"} onPress={muteMusic} />
        <IconButton color={dark ? "#FFF" : "#000"} type={isSoundMute ? "volume-up" : "volume-off"} onPress={muteSound} />
        <IconButton color={dark ? "#FFF" : "#000"} type={ dark ? "wb-sunny" : "brightness-3"} onPress={changeTheme} />
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
  },
});
