import React, { useMemo, useRef, useState, useCallback } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext, open } from "../context/modal";
import { Timer } from "../components/Timer";
import { BurguerButton } from '../components/BurgerButton';
import { gameOver } from '../context/game/actions';

export const GameHeader = () => {
  const {
    dispatch: { openMenu, openGameOver },
  } = useModalContext();
  const {
    state: { initialTime, extraTime, pause, resetTimer, gameOver },
    dispatch: { addTime, setResetTimer },
  } = useGameContext();

  return (
    <View style={styles.container}>
      <BurguerButton onPress={() => openMenu({ show: true })}/>
      <Timer
        initialTime={initialTime}
        stop={pause}
        reset={resetTimer}
        addTime={extraTime}
        gameOver={gameOver}
        onStop={() => openGameOver({ show: true }) }
        onReset={() => setResetTimer({ resetTimer: false}) }
        onTimeChange={() => addTime({ time: 0 })}
      />
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
