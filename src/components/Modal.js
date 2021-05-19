import React, { useMemo, useCallback } from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useModalContext } from "../context/modal";
import { MODAL_TYPES } from "../const/variables";
import {
  MenuTemplate,
  WinTemplate,
  GameOverTemplate,
  TutorialTemplate,
} from "../context/modal/templates";
import { useGameContext } from "../context/game";
import { useGeneralContext } from "../context/general";
import { useTheme } from "../context/theme/themeContext";

const _styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#5c5c5c9c",
  },
  modal: {
    marginTop: 150,
    zIndex: 10,
    position: "absolute",
    width: 320,
    height: 350,
    borderRadius: 10,
    backgroundColor: "#fdf9ef",
  },
  content: {},
});

export const Modal = ({ styles }) => {
  const {
    state: {
      type,
      show,
      content: { title, body },
    },
    dispatch: { close },
  } = useModalContext();
  const {
    state: { currentLevel },
    dispatch: { nextLevel, resetLevel },
  } = useGameContext();
  const {
    dispatch: { goMenu },
  } = useGeneralContext();
  const {
    state: { secondary },
    dispatch: { changeTheme },
  } = useTheme();

  const handleAction = useCallback(
    (action) => {
      if (action == "next") {
        nextLevel();
      } else if (action == "reset") {
        resetLevel();
      } else if (action == "menu") {
        goMenu();
      } else if (action == "theme") {
        changeTheme();
        return;
      }
      close();
    },
    [nextLevel, resetLevel, goMenu, changeTheme, close]
  );

  const content = useMemo(() => {
    let newContent;
    if (type === MODAL_TYPES.MENU) {
      newContent = (
        <MenuTemplate
          onClose={close}
          onChangeTheme={() => handleAction("theme")}
          onMenu={() => handleAction("menu")}
          onReset={() => handleAction("reset")}
        />
      );
    } else if (type === MODAL_TYPES.WIN) {
      newContent = (
        <WinTemplate
          level={currentLevel}
          onPress={() => handleAction("next")}
        />
      );
    } else if (type === MODAL_TYPES.GAME_OVER) {
      newContent = (
        <GameOverTemplate
          level={currentLevel}
          onReset={() => handleAction("reset")}
          onMenu={() => handleAction("menu")}
        />
      );
    } else if (type === MODAL_TYPES.TUTORIAL) {
      newContent = (
        <TutorialTemplate
          title={title}
          body={body}
          onOk={() => handleAction("close")}
        />
      );
    }
    return newContent;
  }, [type, close, handleAction, currentLevel, title, body]);

  return (
    show ? (
      <Animatable.View
        style={[_styles.container, { ...styles }]}
        animation={"fadeIn"}
        duration={1000}
        onAnimationEnd={() => {}}
      >
        <Animatable.View
          style={[_styles.modal, { ...styles, backgroundColor: secondary }]}
          animation={"bounceInDown"}
          duration={1000}
          onAnimationEnd={() => {}}
        >
          {content}
        </Animatable.View>
      </Animatable.View>
    ) : <></>
  );
};
