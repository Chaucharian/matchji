import React from "react";
import { View, StyleSheet } from "react-native";
import { CloseButton } from "../../components/CloseButton";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { Controls } from "../../components/Controls";

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  tutorialContainer: {
    height: "100%",
    justifyContent: "space-evenly",
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
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  options: {
    justifyContent: "space-around",
  },
  textContainer: {
    width: 250,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
});

export const MenuTemplate = ({ onMenu, onClose, onReset }) => (
  <>
    <View
      style={[_styles.container]}
    >
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <Text title>MENU</Text>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={onClose}>
            <Text button>CONTINUE</Text>
          </Button>
          <Button onPress={onReset}>
            <Text button>RESET</Text>
          </Button>
          <Button onPress={onMenu} >
            <Text button>MENU</Text>
          </Button>
          <Controls />
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
            <Text title>YOU WIN!</Text>
            <Text title>LEVEL {level}</Text>
            <Text title>YOUR TIME {time}</Text>
          </View>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button button onPress={onPress}>
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
            <Text title>GAME OVER</Text>
            <Text title>LEVEL {level}</Text>
          </View>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <Button onPress={onReset}>
            <Text button>RESTART</Text>
          </Button>
          <Button onPress={onMenu}>
            <Text button>MENU</Text>
          </Button>
        </View>
      </View>
    </View>
  </>
);

export const TutorialTemplate = ({ onOk, title, body }) => (
  <>
    <View
      style={[_styles.tutorialContainer]}
    >
      <View style={[_styles.header]}>
        <View style={[_styles.titleContainer]}>
          <View style={[{ justifyContent: "center", flexDirection: "column"}]}>
            {title}
          </View>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.textContainer]}>
          {body}
          <View style={[_styles.buttonContainer]}>
            <Button onPress={onOk}>
              <Text button>Entendido</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  </>
);
