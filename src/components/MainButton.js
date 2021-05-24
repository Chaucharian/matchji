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
import { ButtonWithIcon } from "./ButtonWithIcon";
import { Text } from "./Text";

const _styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 3,
    // borderColor: "#000",
    width: 250,
    height: 60,
    backgroundColor: "#fdf9ef",
  },
});

export const MainButton = ({ children, icon, onPress, ...props }) => {
  const { state: { mainButton } } = useTheme();

  return (
    <ButtonWithIcon styles={mainButton} size={24} icon={icon} onPress={onPress} {...props}>
      <Text button styles={{ color: mainButton.color }} >
        {children}
      </Text>
    </ButtonWithIcon>
  );
};
