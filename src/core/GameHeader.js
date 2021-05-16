import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext } from "../context/modal";
import { Timer } from "../components/Timer";
import { PauseButton } from "../components/PauseButton";

export const GameHeader = () => {
  const {
    dispatch: { openMenu, openGameOver },
  } = useModalContext();
  const {
    state: { initialTime, extraTime, pause, resetTimer, gameOver, currentLevel },
    dispatch: { addTime, setResetTimer },
  } = useGameContext();

  return (
    <View style={_styles.container}>
      <PauseButton
        styles={_styles.pauseButton}
        onPress={() => openMenu({ show: true })}
      />
      <View style={[_styles.timeContainer]}>
        <View style={[{ justifyContent: "center", flexDirection: "column", alignItems: "center" }]}>
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
          <Text style={[_styles.levelText]}>Nivel {currentLevel}</Text>
        </View>
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
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
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  pauseButton: {
    position: "absolute",
    top: 60,
    left: 25,
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
