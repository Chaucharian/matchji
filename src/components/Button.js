import React, { useCallback } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useSoundContext } from "../context/sound";
import { useTheme } from "../context/theme/themeContext";

const _styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    width: 200,
    height: 50,
    backgroundColor: "#fdf9ef",
  },
});

export const Button = ({ children, styles, onPress }) => {
  const { state: { primary } } = useTheme();
  const { playTap } = useSoundContext();

  const handlePress = useCallback(() => {
    playTap();
    onPress();
  }, [onPress, playTap]);

  return (
    // Using TouchableNativeFeedback cause with position absolute not work properly
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={[_styles.container, { ...styles, backgroundColor: primary }]}>{children}</View>
    </TouchableNativeFeedback>
  );
};
