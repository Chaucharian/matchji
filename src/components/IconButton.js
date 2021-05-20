import React, { useCallback } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useTheme } from "../context/theme/themeContext";
import { useSound } from "../hooks/useSound";
import Icon from "react-native-vector-icons/MaterialIcons";

const _styles = StyleSheet.create({
  container: {
    color: "#000",
  },
});

export const IconButton = ({ type, size=40, styles, onPress }) => {
  const {
    state: { primary },
  } = useTheme();
  // const { play } = useSound({ file: "tap.mp3" });

  const handlePress = useCallback(() => {
    // play();
    onPress();
  }, [onPress]);

  return (
    <Icon.Button
      name={type}
      backgroundColor={"transparent"}
      size={size}
      style={[_styles.container, { ...styles }]}
      onPress={onPress}
    />
  );
};
