import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { useTimer } from "../hooks";
import { gameOver } from '../context/game/actions';

export const Timer = ({ initialTime, addTime, stop, start, reset, win, onSetLevelTime = () => {}, onReset = () => {}, onTimeChange = () => {}, onStop = () => {} }) => {
  const [currentTime, setTime] = useState(initialTime);
  const [winTime, showWinTime] = useState(false);

  useTimer({
    currentTime,
    stop,
    onSetTime: (value) => setTime(value),
  });

  useEffect( () => {
    if(addTime) {
      setTime(currentTime+addTime);
      onTimeChange(addTime);
    }
  }, [currentTime, addTime, onTimeChange]);

  useEffect( () => {
    if(reset) {
      setTime(initialTime);
      onReset();
    }
  }, [currentTime, onReset, addTime, reset, initialTime]);

  useEffect( () => {
    if(currentTime === 0) {
      onStop();
      setTime(null);
    }
  }, [currentTime, onStop ]);

  // useEffect( () => {
  //   if(win && !winTime) {
  //     onSetLevelTime(currentTime);
  //     showWinTime(true);
  //   }
  // }, [win, currentTime, onSetLevelTime, winTime]);

  return (
      <Text style={styles.text}>
        {currentTime === null ? 0 : currentTime }
      </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "#645135"
    // color: "white",
  },
});
