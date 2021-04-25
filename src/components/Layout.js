import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    // alignContent: "center",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    // backgroundColor: "aliceblue",
  },
});

export const Layout = ({ tiles, styles }) => {
  return (
    <View style={[_styles.container, { styles }]}>
      {tiles.map(({ tile: Tile, ...props }, i) => (
        <Tile key={i} {...props} />
      ))}
    </View>
  );
};
