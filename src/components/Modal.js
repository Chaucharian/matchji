import React, { useMemo, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useModalContext } from "../context/modal";
import { MODAL_TYPES } from '../const/variables';
import { MenuTemplate, WinTemplate } from '../context/modal/templates';
import { useGameContext } from '../context/game';
import { nextLevel } from '../context/game/actions';

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

export const Modal = ({ show, onClose, styles }) => {
  const { state: { type }, dispatch: { openWin } } = useModalContext();
  const { state: { currentLevel }, dispatch: { nextLevel } } = useGameContext();

  const handleAction = useCallback( (action) => {
    nextLevel();
    openWin({ show: false });
  }, [nextLevel, openWin]);

  const content = useMemo( () => {
    let newContent;
    if (type === MODAL_TYPES.MENU) {
      newContent = <MenuTemplate onClose={onClose}/>;
    } else if (type === MODAL_TYPES.WIN) {
      newContent  = <WinTemplate level={currentLevel} onPress={handleAction} />;
    }
    return newContent;
  }, [type, handleAction, currentLevel, onClose]);


  return (
    <>
      {show && (
        <Animatable.View
          style={[_styles.container, { ...styles }]}
          animation={"fadeIn"}
          duration={1000}
          onAnimationEnd={() => {}}
        >
          <Animatable.View
            style={[_styles.modal, { ...styles }]}
            animation={"bounceInDown"}
            duration={1000}
            onAnimationEnd={() => {}}
          >
            {content}
          </Animatable.View>
        </Animatable.View>
      )}
    </>
  );
};
