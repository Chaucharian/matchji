import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { usePlayingContext, init, remove, hide, resetBoard } from "../context";

export const Game = () => {
  const {
    state: { tiles: contextTiles },
    dispatch,
  } = usePlayingContext();
  const { tiles, hideTiles, changes } = useTiles(contextTiles);

  useEffect(() => {
    dispatch(init({ amount: 4 }));
  }, [dispatch]);

  useEffect(() => {
    if (changes.type === "hide") {
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
