import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useTimer } from "../hooks";

export const Timer = ({ initialTime, addTime, stop, start, onTimeAdded = () => {}, onStop = () => {} }) => {
  const [currentTime, setTime] = useState(initialTime);

  useTimer({
    currentTime,
    onSetTime: (value) => setTime(value),
    onStop
  });

  useEffect( () => {
    if(addTime) {
      setTime(currentTime+addTime);
      onTimeAdded(addTime);
    }
  }, [currentTime, addTime]);

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
