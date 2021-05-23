import React from "react";
import { StyleSheet, View } from "react-native";
import { useGeneralContext } from "../context/general";
import { useTheme } from "../context/theme/themeContext";
import { IconButton } from "./IconButton";
import { useMute } from '../hooks/useMute';

export const Controls = () => {
   const { state: { isMusicMute, isSoundMute }, dispatch: { muteMusic, muteSound } } = useGeneralContext();
   const { state: { dark }, dispatch: { changeTheme } } = useTheme();
   useMute();

  return (
    <View style={[_styles.container]}>
    <View style={[_styles.buttonContainer]}>
        <IconButton type={isMusicMute ? "music-off" : "music-note" } onPress={muteMusic} />
        <IconButton type={isSoundMute ? "volume-off" : "volume-up" } onPress={muteSound} />
        <IconButton type={ dark ? "wb-sunny" : "brightness-3"} onPress={changeTheme} />
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
