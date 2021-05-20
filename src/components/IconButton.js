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
import AntIcon from "react-native-vector-icons/AntDesign";

export const IconButton = ({
  type,
  ant,
  size = 40,
  color,
  styles,
  onPress,
}) => {
  const {
    state: { dark },
  } = useTheme();
  
  // const { play } = useSound({ file: "tap.mp3" });

  const handlePress = useCallback(() => {
    // play();
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={onPress} style={[{ ...styles }]}>
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
