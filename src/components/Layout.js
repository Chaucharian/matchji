import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTimer } from "../hooks";
import { useGameContext } from "../context";

export const Layout = ({}) => {
  return <View style={[styles.container, { [label]: selectedValue }]}></View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    // alignItems: "flex-end",
    alignItems: "center",
    // justifyContent: "center",
    height: 100,
  },
  score: {
    fontSize: 20,
    color: "gold",
  },
  time: {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
    fontSize: 50,
    color: "white",
  },
});
