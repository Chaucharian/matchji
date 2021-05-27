import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import { useTheme } from "../context/theme/themeContext";

const _styles = StyleSheet.create({
});

export const Text = ({
  styles,
  title: titleType,
  subtitle: subtitleType,
  button: buttonType,
  bold,
  children,
}) => {
  const {
    state: {
      fonts: { title, subtitle, button },
    },
  } = useTheme();
  const currentStyles = useCallback( () => {
    if(titleType) {
      return title;
    }
    if(subtitleType) {
      return subtitle;
    }
    if(buttonType) {
      return button
    }
  }, [button, buttonType, subtitle, subtitleType, title, titleType]);

  return (
    <NativeText style={[{ ...currentStyles(), ...styles }]}>
      {children}
    </NativeText>
  );
};
