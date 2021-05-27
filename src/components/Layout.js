import React from "react";
import { StyleSheet, View } from "react-native";

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export const Layout = ({ tiles, styles }) => {

  return (
    <View style={[_styles.container, { styles }]}>
      {tiles.map(({ tile: Tile, key, ...props }, i) => (
        <Tile key={key} amount={tiles.length} index={i} {...props} />
      ))}
    </View>
  );
};
