import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useTimer } from "../hooks";

export const Timer = ({ initialTime, addTime, stop, start, reset, onReset = () => {}, onTimeChange = () => {}, onStop = () => {} }) => {
  const [currentTime, setTime] = useState(initialTime);

  useTimer({
    currentTime,
    stop,
    onSetTime: (value) => setTime(value),
    onStop
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

  return (
      <Text style={styles.text}>
        {currentTime}
      </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 60,
    color: "white",
  },
});
