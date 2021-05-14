import React from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, View } from "react-native";

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
    backgroundColor: "#fdf9ef"
  },
});

export const Button = ({ children, styles, onPress }) => {
    // TODO add theme to apply dark mode
    // const { primary, secondary } = useTheme();

  return (
    // Using TouchableNativeFeedback cause with position absolute not work properly
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[_styles.container, { ...styles }]}>
          {children}
      </View>
    </TouchableNativeFeedback>
  );
};
