import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { usePlayingContext, init, resetBoard } from "../context";

export const Game = () => {
  const {
    state: { emojis },
    dispatch,
  } = usePlayingContext();
  const { tiles, hideTiles } = useTiles(emojis);

  useEffect(() => {
    dispatch(init({ amount: 20 }));
  }, [dispatch]);

  useEffect(() => {
    if (hideTiles.tiles?.length) {
      dispatch(resetBoard({ tiles: hideTiles.tiles }));
    }
  }, [hideTiles]);

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
