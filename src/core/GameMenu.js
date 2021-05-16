import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useModalContext } from "../context/modal";
import { Button } from "../components/Button";
import { useGeneralContext } from "../context/general";

export const GameMenu = () => {
  const {
    state: { show, }, dispatch: { initZenGame, initGame }
  } = useGeneralContext();
//   usePause(show);

  return (
    <View
    style={[_styles.container]}
  >
    <View style={[_styles.header]}>
      <View style={[_styles.titleContainer]}>
        <Text style={[_styles.title]}>MATCHJI</Text>
      </View>
    </View>
    <View style={[_styles.menuContainer]}>
      <View style={[_styles.options]}>
        <Button onPress={() => initGame() }>
          <Text>CLASSIC</Text>
        </Button>
        <Button onPress={() => initZenGame() } >
          <Text>ZEN</Text>
        </Button>
        <Button onPress={() => {}}>
          <Text>REMOVE ADS</Text>
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