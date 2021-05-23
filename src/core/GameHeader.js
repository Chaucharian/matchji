import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext } from "../context/modal";
import { Timer } from "../components/Timer";
import { PauseButton } from "../components/PauseButton";
import { IconButton } from "../components/IconButton";

export const GameHeader = () => {
  const {
    dispatch: { openMenu, openGameOver },
  } = useModalContext();
  const {
    state: {
      initialTime,
      extraTime,
      pause,
      resetTimer,
      gameOver,
      currentLevel,
    },
    dispatch: { addTime, setResetTimer },
  } = useGameContext();

  return (
    <View style={_styles.container}>
      <IconButton
        type={"pause-circle-outline"}
        styles={_styles.pauseButton}
        size={50}
        onPress={() => openMenu({ show: true })}
      />
      <View style={[_styles.timeContainer]}>
        <View
          style={[
            {
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            },
          ]}
        >
          <Text style={[_styles.levelText]}>Nivel {currentLevel}</Text>
          <Timer
            initialTime={initialTime}
            stop={pause}
            reset={resetTimer}
            addTime={extraTime}
            gameOver={gameOver}
            onStop={() => openGameOver({ show: true })}
            onReset={() => setResetTimer({ resetTimer: false })}
            onTimeChange={() => addTime({ time: 0 })}
          />
        </View>
      </View>
      <IconButton
        ant
        type={"gift"}
        styles={_styles.giftButton}
        size={50}
        onPress={() => openMenu({ show: true })}
      />
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 130,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  levelText: {
    fontFamily: "Roboto",
    fontVariant: ["lining-nums"],
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  pauseButton: {
    position: "absolute",
    top: 60,
    left: 25,
  },
  giftButton: {
    position: "absolute",
    top: 60,
    right: 25,
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
