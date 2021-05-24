import React, { useCallback, useMemo } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Icon from  "react-native-vector-icons/MaterialIcons";
import { useSoundContext } from "../context/sound";
import { useTheme } from "../context/theme/themeContext";
import { Text } from "./Text";

const _styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 250,
    height: 60,
    backgroundColor: "#fdf9ef",
  },
});

export const ButtonWithIcon = ({ children, icon, size=24, right=false, styles, onPress= ()=>{} }) => {
  const {
    state: { primary: backgroundContetxtColor, fonts: { button: { color } } },
  } = useTheme();
  const iconDirection = useMemo( () => right ? "row-reverse" : "row",[right]);
  const { playTap } = useSoundContext();

  const handlePress = useCallback(() => {
    playTap();
    onPress();
  }, [onPress, playTap]);

  return (
    // Using TouchableNativeFeedback cause with position absolute not work properly
    <TouchableNativeFeedback onPress={handlePress}>
      <View
        style={[_styles.container, { backgroundColor: backgroundContetxtColor, ...styles  }]}
      >
        <View
          style={[
            {
              display: "flex",
              flexDirection: iconDirection,
              alignItems: "center"
            },
          ]}
        >
          <Icon
            name={icon}
            color={styles ? styles.color : color }
            backgroundColor={"transparent"}
            size={size}
          />
          <View style={{ paddingLeft: 24, paddingRight: 24 }}>
            {children}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
