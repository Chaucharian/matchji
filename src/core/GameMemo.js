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
  changeTiles,
  hideAll,
} from "../context";
import { sleep } from "../utils";
import { INITIAL_TILE_ANIMATION_DURATION } from '../utils';

export const Game = () => {
  const { dispatch } = usePlayingContext();
  const { tiles } = useTiles();

  const initializeScreen = useCallback(async () => {
    dispatch(init({ amount: 20, show: true }));
    await sleep(5000);
    dispatch(hideAll({ show: false }));
    dispatch(changeTiles({ animationDuration: INITIAL_TILE_ANIMATION_DURATION }));
  }, [dispatch]);

  useEffect(() => {
    initializeScreen();
  }, [dispatch, initializeScreen]);

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
