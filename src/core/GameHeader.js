import React from "react";
import { StyleSheet, View } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext } from "../context/modal";
import { Timer } from "../components/Timer";
import { Text } from "../components/Text";
import { IconButton } from "../components/IconButton";
import { useLayoutContext } from "../context/layout";
import { ExtraTime } from "../components/ExtraTime";

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
      levelTime
    },
    dispatch: { addTime, setResetTimer },
  } = useGameContext();
  const { state: { boardCompleted }} = useLayoutContext();

  return (
    <View style={_styles.container}>
      <IconButton
        type={"pause-circle-outline"}
        styles={_styles.pauseButton}
        size={50}
        onPress={() => openMenu({ show: true })}
      />
      <ExtraTime value={extraTime} styles={_styles.extraTime}/>
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
          <Text subtitle styles={_styles.levelText}>Nivel {currentLevel}</Text>
          <Timer
            initialTime={initialTime}
            stop={pause}
            reset={resetTimer}
            addTime={extraTime}
            gameOver={gameOver}
            win={boardCompleted}
            levelTime={levelTime}
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
    // fontVariant: ["lining-nums"],
    fontSize: 15,
    // color: "black",
    // fontWeight: "bold",
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
  extraTime: {
    position: "absolute",
    top: 105,
    right: 133,
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
