import React, { useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";

export const Emoji = ({
  emoji,
  left = 0,
  top = 0,
  size = 50,
  rotation,
  onPress,
  ...props
}) =>
  useMemo(
    () => (
      <Text
        onPress={() => onPress(emoji)}
        style={styles.emoji}
        style={{
          left,
          top,
          fontSize: size,
          // transform: [
          //   { translateY: top },
          //   { translateX: left },
          //   { rotate: `${rotation}deg` },
          // ],
        }}
        {...props}
      >
        {emoji.emoji}
      </Text>
    ),
    [emoji]
  );

const styles = StyleSheet.create({
  emoji: {
    position: "absolute",
  },
});
