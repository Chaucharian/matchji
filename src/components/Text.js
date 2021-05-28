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
  body: bodyType,
  bold,
  children,
}) => {
  const {
    state: {
      fonts: { title, subtitle, button, body },
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
    if(bodyType) {
      return body
    }
  }, [titleType, subtitleType, buttonType, bodyType, title, subtitle, button, body]);

  return (
    <NativeText style={[{ ...currentStyles(), ...styles }]}>
      {children}
    </NativeText>
  );
};
