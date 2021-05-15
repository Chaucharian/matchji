import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { CloseButton } from "../../components/CloseButton";
import { Button } from "../../components/Button";

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
    fontSize: 30,
    fontWeight: "bold",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  options: {
    justifyContent: "space-around",
  },
});

export const MenuTemplate = ({ onClose, onReset }) => (
  <>
    <View
      style={[_styles.container]}
    >
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <Text style={[_styles.title]}>MENU</Text>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={onReset}>
            <Text>RESET</Text>
          </Button>
          <Button>
            <Text>BACK</Text>
          </Button>
          <Button>
            <Text>BACK</Text>
          </Button>
        </View>
      </View>
    </View>
    <CloseButton
      styles={_styles.closeButton}
      onPress={onClose}
    />
  </>
);

export const WinTemplate = ({ onPress, level, time }) => (
  <>
    <View
      style={[_styles.container]}
    >
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <View style={[{ justifyContent: "center", flexDirection: "column"}]}>
            <Text style={[_styles.title]}>YOU WIN!</Text>
            <Text style={[_styles.title]}>LEVEL {level}</Text>
            <Text style={[_styles.title]}>YOUR TIME {time}</Text>
          </View>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={onPress}>
            <Text>NEXT</Text>
          </Button>
        </View>
      </View>
    </View>
  </>
);

export const GameOverTemplate = ({ onReset, onMenu, level }) => (
  <>
    <View
      style={[_styles.container]}
    >
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <View style={[{ justifyContent: "center", flexDirection: "column"}]}>
            <Text style={[_styles.title]}>GAME OVER</Text>
            <Text style={[_styles.title]}>LEVEL {level}</Text>
          </View>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={onReset}>
            <Text>RESTART</Text>
          </Button>
          <Button onPress={onMenu}>
            <Text>BACK</Text>
          </Button>
        </View>
      </View>
    </View>
  </>
);
