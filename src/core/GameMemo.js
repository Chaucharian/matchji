import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import {
  usePlayingContext,
  initializeBoard
} from "../context";

export const Game = () => {
  const { dispatch } = usePlayingContext();
  const { tiles } = useTiles();

  useEffect(() => {
    initializeBoard(dispatch);
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      <Layout tiles={tiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
    marginRight: 50,
  },
});
