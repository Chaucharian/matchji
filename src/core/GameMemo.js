import React, { useCallback, useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout } from "../components/Layout";
import { useTiles } from "../hooks/useTiles";

export const Game = () => {
  const [currentTile, setCurrentTile] = useState(null);
  const [lastTile, setLastTile] = useState(null);
  const [isMatch, setIsMatch] = useState({
    tile: null,
    match: false,
  });

  const onValidateMatch = (tile) => {
    if (!currentTile) {
      setCurrentTile(tile);
    } else if (!lastTile) {
      setCurrentTile(tile);
    }
  };

  const tiles = useTiles(20, { onValidateMatch, isMatch });

  useEffect(() => {
    if (currentTile === lastTile) {
      setIsMatch({ tile: currentTile, match: true });
    }
  }, [currentTile, lastTile]);
  console.log(tiles);
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
