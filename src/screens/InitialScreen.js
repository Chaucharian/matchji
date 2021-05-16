import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/theme/themeContext";
import { GameMenu } from "../core/GameMenu";
import { useCurrentMode } from "../hooks/useCurrentMode";

export const InitialScreen = () => {
  const GameMode = useCurrentMode();
  const {
    state: { secondary },
  } = useTheme();
  return (
    <View style={[{ ..._styles.container, backgroundColor: secondary }]}>
      {GameMode ? <GameMode /> : <GameMenu />}
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
