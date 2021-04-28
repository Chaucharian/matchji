import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { usePlayingContext, init } from "../context";

export const Game = () => {
  const {
    state: { emojis },
    dispatch,
  } = usePlayingContext();
  const tiles = useTiles(4, emojis);

  useEffect(() => {
    dispatch(init({ amount: 4 }));
  }, [dispatch]);

  return (
    <View>
      <Layout tiles={tiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
