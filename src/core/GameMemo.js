import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Layout, Tile } from "../components";
import Emojis from "../models/emojis";
import { sortEmojis } from "../utils";

const emojis = sortEmojis(Emojis, 20);

export const Game = () => {
  const tiles = emojis.map((tile, index, array) => ({
    tile: Tile,
    show: true,
    onPress: () => onPress({ tile, array }),
    styles: { width: 100, height: 100 },
    content: tile,
  }));

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
