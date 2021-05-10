import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";
import {
  useLayoutContext,
  initializeBoard
} from "../context/layout";

export const GameLayout = () => {
  const { state: { boardCompleted }, dispatch } = useLayoutContext();
  const { tiles } = useTiles();

  useEffect(() => {
    initializeBoard(dispatch, 6);
  }, [dispatch]);

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
