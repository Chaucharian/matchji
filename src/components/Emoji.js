import React, { useMemo, useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

export const Emoji = ({
  emoji,
  left = 0,
  top = 0,
  size = 50,
  rotation,
  onPress,
  ...props
}) => {
  const mounted = useRef(true);

  useEffect(() => {
    return () => (mounted.current = false);
  }, []);

  return (
    <Animatable.Text
      animation={mounted.current ? "bounceIn" : "bounceOut"}
      duration={2000}
      // iterationCount={5}
      // direction="alternate"
      onPress={onPress}
      style={styles.emoji}
      style={{
        ...styles.emoji,
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
      {emoji}
    </Animatable.Text>
  );
};

const styles = StyleSheet.create({
  emoji: {
    position: "absolute",
  },
});
