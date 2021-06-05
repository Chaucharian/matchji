import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useGameContext } from "../context/game";
import { useModalContext } from "../context/modal";
import { Timer } from "../components/Timer";
import { Text } from "../components/Text";
import { IconButton } from "../components/IconButton";
import { useLayoutContext } from "../context/layout";
import { GAME_MODES } from "../const";
import { useGeneralContext } from "../context/general";
import { AdMobRewarded } from "react-native-admob-next";
import { useRewardedAd } from '../hooks/useRewardedAd';
import { ExtraTime } from '../components/ExtraTime';

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
      levelTime,
    },
    dispatch: { addTime, setResetTimer },
  } = useGameContext();
  const {
    state: { currentMode },
  } = useGeneralContext();
  const {
    state: { boardCompleted },
  } = useLayoutContext();

  // const _addTime = useCallback( ({ amount }) => {
  //   addTime({ time: amount });
  // }, [addTime])

  // const { setReward, closeRewardedAd } = useRewardedAd({ onGetReward: _addTime });
  const [extraTimeAnimationEnd, setExtraTimeAnimationEnd] = useState(false);
  const classicMode = currentMode === GAME_MODES.CLASSIC;

  return (
    <View style={_styles.container}>
      <IconButton
        type={"pause-circle-outline"}
        styles={_styles.pauseButton}
        size={50}
        onPress={() => openMenu({ show: true })}
      />
      {classicMode && (
        <ExtraTime value={extraTime} onEnd={() => setExtraTimeAnimationEnd(true) } styles={_styles.extraTime} />
      )}
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
          {classicMode && (
            <Text subtitle styles={_styles.levelText}>
              Nivel {currentLevel}
            </Text>
          )}
          {classicMode && (
            <Timer
              initialTime={initialTime}
              stop={pause}
              reset={resetTimer}
              addTime={{ extraTime, animationEnd: extraTimeAnimationEnd }}
              gameOver={gameOver}
              win={boardCompleted}
              levelTime={levelTime}
              onStop={() => openGameOver({ show: true })}
              onReset={() => setResetTimer({ resetTimer: false })}
              onTimeChange={() => { 
                addTime({ time: 0 });
                setExtraTimeAnimationEnd(false);
              }}
            />
          )}
        </View>
      </View>
      <IconButton
        ant
        type={"gift"}
        styles={_styles.giftButton}
        size={50}
        onPress={() => {
          AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
          // AdMobRewarded.addEventListener('rewarded', (reward) => setReward(reward) );
          // AdMobRewarded.addEventListener('adClosed', () => closeRewardedAd() );
        }}
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
