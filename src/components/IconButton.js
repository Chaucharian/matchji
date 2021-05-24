import React, { useCallback } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useTheme } from "../context/theme/themeContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useSoundContext } from "../context/sound";

export const IconButton = ({
  type,
  ant,
  size = 32,
  color,
  styles,
  disabled,
  onPress,
}) => {
  const {
    state: { dark },
  } = useTheme();
  const { playTap } = useSoundContext();

  const handlePress = useCallback(() => {
    playTap();
    onPress();
  }, [onPress, playTap]);

  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress} style={[{ ...styles }]}>
      {ant ? (
        <AntIcon.Button
          disabled={true}
          name={type}
          color={dark ? "#FFF" : "#000"}
          backgroundColor={"transparent"}
          size={size}
        />
      ) : (
        <Icon.Button
          disabled={true}
          name={type}
          color={dark ? "#FFF" : "#000"}
          backgroundColor={"transparent"}
          size={size}
        />
      )}
    </TouchableOpacity>
  );
};
