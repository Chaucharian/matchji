import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useTimer } from "../hooks";
import { Text } from './Text';

export const Timer = ({ initialTime, addTime, stop, start, reset, win, levelTime, onReset = () => {}, onTimeChange = () => {}, onStop = () => {} }) => {
  const [currentTime, setTime] = useState(initialTime);

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

  useEffect( () => {
    if(win) {
      levelTime.current = currentTime;
    }
  }, [win, currentTime, levelTime]);

  return (
      <Text title styles={styles.text}>
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
