import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import { useInitializeBoard } from "../hooks/useInitializeBoard";
import { useLayoutContext } from "../context/layout";
import { useWin } from '../hooks/useWin';

export const GameLayout = () => {
  const {
    state: { boardCompleted },
  } = useLayoutContext();
  const { tiles } = useTiles();
  useInitializeBoard(6);
  useWin();

  useEffect(() => {
    console.log(boardCompleted);
  }, [boardCompleted]);

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
