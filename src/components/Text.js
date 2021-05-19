import React, { useState, useEffect } from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import { useTheme } from "../context/theme/themeContext";

const _styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});

export const Text = ({
  styles,
  title: titleType,
  subtitle: subtitleType = true,
  button: buttonType,
  bold,
  children,
}) => {
  const {
    state: {
      fonts: { title, subtitle, button },
    },
  } = useTheme();
  const [currentStyles, setCurrentStyles] = useState({});

  useEffect(() => {
    if (titleType) {
      setCurrentStyles(title);
    } else if (subtitleType) {
      setCurrentStyles(subtitle);
    } else if (buttonType) {
      setCurrentStyles(button);
    } else if (bold) {
      setCurrentStyles({ ...currentStyles, ..._styles.bold });
    }
  }, [
    titleType,
    subtitleType,
    buttonType,
    currentStyles,
    bold,
    title,
    subtitle,
    button,
  ]);

  return (
    <NativeText style={[{ ...currentStyles, ...styles }]}>
      {children}
    </NativeText>
  );
};
