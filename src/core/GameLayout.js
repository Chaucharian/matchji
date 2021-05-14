import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { useInitializeBoard } from "../hooks/useInitializeBoard";
import { useLayoutContext } from "../context/layout";
import { useGameContext } from "../context/game";
import { useWin } from '../hooks/useWin';

export const GameLayout = () => {
  const {
    state: { boardCompleted },
  } = useLayoutContext();
  const { tiles } = useTiles();
  const { state: { currentLevelParams, reset } } = useGameContext();
  const { initialize: initializeBoard, reset: resetBoard } = useInitializeBoard(currentLevelParams);
  useWin();

  useEffect(() => {
    console.log("WIN! ",boardCompleted);
  }, [boardCompleted]);


  useEffect(() => {
    initializeBoard(currentLevelParams);
  }, [currentLevelParams, initializeBoard]);

  useEffect(() => {
    if(reset) {
      resetBoard();
    }
  }, [reset, resetBoard]);

  return (
    <View style={[styles.container]}>
      <Layout tiles={tiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
});
