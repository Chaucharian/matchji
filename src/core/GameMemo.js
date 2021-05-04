import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { usePlayingContext, init, remove, hide, resetBoard } from "../context";
import { sleep } from "../utils";

export const Game = () => {
  const {
    state: { tiles: contextTiles },
    dispatch,
  } = usePlayingContext();
  const { tiles, hideTiles, changes } = useTiles(contextTiles);

  const initializeScreen = useCallback(async () => {
    dispatch(init({ amount: 20, show: true }));
    await sleep(5000);
    dispatch(init({ amount: 20, show: false }));
  }, [init]);

  useEffect(() => {
    initializeScreen();
  }, [dispatch, initializeScreen]);

  useEffect(() => {
    if (changes.type === "hide" && changes.tiles.length !== 0) {
      dispatch(hide({ tiles: changes.tiles }));
    }
  }, [changes]);

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
