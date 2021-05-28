import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "../components/Button";
import { MainButton } from "../components/MainButton";
import { Controls } from "../components/Controls";
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
        <Image source={require('../assets/logo.png')} />
        </View>
      </View>
      <View style={[{ flex: 0.15 }]}></View>
      <View style={[_styles.menuContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={() => initGame()}>
            <Text button>Classic</Text>
          </Button>
          <View style={[{ flex: 0.1 }]}></View>
          <Button onPress={() => initZenGame()}>
            <Text button>Zen</Text>
          </Button>
          <View style={[{ flex: 0.5 }]}></View>
          <MainButton icon="emoji-objects" onPress={() => {}}>
            Remove Ads
          </MainButton>
        </View>
      </View>
      <Controls />
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
    fontFamily: "RubikOne-Regular",
    fontSize: 70,
    // fontWeight: "bold",
  },
  menuContainer: {
    //   flex: 1,
    height: 250,
    justifyContent: "center",
    flexDirection: "row",
  },
  options: {
    // justifyContent: "space-around",
  },
});
