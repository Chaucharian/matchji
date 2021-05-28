import React from "react";
import { View, StyleSheet } from "react-native";
import { CloseButton } from "../../components/CloseButton";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { Controls } from "../../components/Controls";
import { IconButton } from "../../components/IconButton";
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { MainButton } from '../../components/MainButton';

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
  body: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 0,
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
  // options: {
  //   justifyContent: "space-around",
  // },
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
          <Text title>Pause</Text>
        </View>
      </View>
      <View style={[_styles.optionsContainer]}>
        <View style={[_styles.options]}>
          <View style={[{ flex: 0.3 }]}></View>
          <ButtonWithIcon icon={"play-arrow"} onPress={onClose}>
            <Text button>CONTINUE</Text>
          </ButtonWithIcon>
          <View style={[{ flex: 0.07 }]}></View>
          <ButtonWithIcon icon={"settings-backup-restore"} onPress={onReset}>
            <Text button>RESET</Text>
          </ButtonWithIcon>
          <View style={[{ flex: 0.07 }]}></View>
          <ButtonWithIcon icon={"home"} onPress={onMenu}>
            <Text button>HOME</Text>
          </ButtonWithIcon>
          <View style={[{ flex: 0.2 }]}></View>
          <Controls />
        </View>
      </View>
    </View>
    <IconButton
      size={43}
      type="highlight-off"
      styles={_styles.closeButton}
      onPress={onClose}
    />
  </>
);

export const WinTemplate = ({ onPress, level, time }) => (
  <View
    style={[_styles.container]}
  >
    <View style={[_styles.header]}>
      <View style={[_styles.titleContainer]}>
        <View style={[{ alignItems: "center" }]}> 
        <Text title >You Win!</Text>
        <Text button>Level {level}</Text>
        </View>
      </View>
    </View>
    <View style={[_styles.optionsContainer]}>
      <View style={[_styles.options]}>
        <View style={[{ flex: 0.3 }]}></View>
        <View style={[{ display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "center"}]} >
          <IconButton type="timer" disabled/>
          <Text button>Time: {time}<Text subtitle>s</Text></Text>
        </View>
        <View style={[{ flex: 0.3 }]}></View>
        <MainButton icon={"arrow-right-alt"} size={35} right onPress={onPress}>
          Next level
        </MainButton>
      </View>
    </View>
  </View>
);

export const GameOverTemplate = ({ onReset, onMenu, level }) => (
  <View
  style={[_styles.container]}
>
  <View style={[_styles.header]}>
    <View style={[_styles.titleContainer]}>
      <View style={[{ alignItems: "center" }]}> 
      <Text title >You Lose!</Text>
      <Text button>Level {level}</Text>
      </View>
    </View>
  </View>
  <View style={[_styles.optionsContainer]}>
    <View style={[_styles.options]}>
      <View style={[{ flex: 0.3 }]}></View>
      <ButtonWithIcon icon={"home"} onPress={onMenu}>
        <Text button>HOME</Text>
      </ButtonWithIcon>
      <View style={[{ flex: 0.1 }]}></View>
      <MainButton icon={"settings-backup-restore"} size={35} right onPress={onReset}>
        Reset
      </MainButton>
    </View>
  </View>
</View>
);

export const TutorialTemplate = ({ onOk, title, body }) => (
  <View
    style={[_styles.container]}
  >
    <View style={[_styles.header]}>
      <View style={[_styles.titleContainer]}>
        <View style={[{ alignItems: "center" }]}> 
          {title}
        </View>
      </View>
    </View>
    <View style={[_styles.body]}>
    <View style={[{ flex: 0.3 }]}></View>
    <View style={[{ justifyContent: "center", alignItems: "center" }]}>
      <View style={[{ paddingLeft: 15, paddingRight: 15 }]}>
        {body}
      </View>
      <View style={[{ flex: 0.3 }]}></View>
      <MainButton onPress={onOk}>
          Jugar
      </MainButton>
    </View>
    </View>
  </View>
);
