import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useGameContext, useLayoutContext, init, initializeBoard} from "../context";

export const GameHeader = () => {
  const {
    settings: { currentTime, pause },
    openMenu
  } = useGameContext();
  const { } = useLayoutContext();

  return (
    <View style={styles.container}>
      <Button
        title="MENU"
        onPress={() => openMenu(!pause) }
      />
      <Text style={styles.time} onPress={() => console.log(" TIME ")}>
        {currentTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  score: {
    fontSize: 20,
    color: "gold",
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
