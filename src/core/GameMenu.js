import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { useGeneralContext } from "../context/general";

export const GameMenu = () => {
  const {
    dispatch: { initZenGame, initGame },
  } = useGeneralContext();

  return (
    <View style={[_styles.container]}>
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <Text title styles={_styles.title}>
            MATCHJI
          </Text>
        </View>
      </View>
      <View style={[_styles.menuContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={() => initGame()}>
            <Text button>CLASSIC</Text>
          </Button>
          <Button onPress={() => initZenGame()}>
            <Text button>ZEN</Text>
          </Button>
          <Button onPress={() => {}}>
            <Text button>REMOVE ADS</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
  },
  menuContainer: {
    //   flex: 1,
    height: 250,
    justifyContent: "center",
    flexDirection: "row",
  },
  options: {
    justifyContent: "space-around",
  },
});
