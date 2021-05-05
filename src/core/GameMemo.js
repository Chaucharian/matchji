import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import {
  usePlayingContext,
  init,
  remove,
  hide,
  show,
  resetBoard,
} from "../context";
import { sleep } from "../utils";

export const Game = () => {
  const {
    state: { tiles: contextTiles },
    dispatch,
  } = usePlayingContext();
  const { tiles, changes } = useTiles(contextTiles);

  const initializeScreen = useCallback(async () => {
    dispatch(init({ amount: 20, show: true }));
    await sleep(5000);
    dispatch(init({ amount: 20, show: false }));
  }, [init]);

  useEffect(() => {
    initializeScreen();
  }, [dispatch, initializeScreen]);

  useEffect(() => {
    if (changes.tiles.length !== 0) {
      if (changes.type === "hide") {
        console.log(" HIDE ");
        dispatch(show({ tiles: changes.tiles, show: false }));
      } else if (changes.type === "show") {
        dispatch(show({ tiles: changes.tiles, show: true }));
      }
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
