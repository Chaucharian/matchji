import React from "react";
import { StyleSheet, Text } from "react-native";

export const Emoji = ({
  emoji,
  left = 0,
  top = 0,
  size = 50,
  onPress,
  ...props
}) => (
  <Text
    onPress={onPress}
    style={styles.emoji}
    style={{ left, top, fontSize: size }}
    {...props}
  >
    {emoji}
  </Text>
);

const styles = StyleSheet.create({
  emoji: {
    position: "absolute",
  },
});
