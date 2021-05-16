import React, { useState, useEffect } from "react";
import {
  Text as NativeText
} from "react-native";
import { useTheme } from "../context/theme/themeContext";

export const Text = ({  styles, title: titleType, subtitle: subtitleType = true, button: buttonType, children }) => {
  const { state: { fonts: { title, subtitle, button,  } } } = useTheme();
  const [currentStyles, setCurrentStyles] = useState({});

  useEffect( () => {
    if(titleType){
      setCurrentStyles(title);
    } else if(subtitleType){
      setCurrentStyles(subtitle);
    } else if(buttonType){
      setCurrentStyles(button);
    }
  },[titleType, subtitleType, buttonType, title, subtitle, button]);

  return (
      <NativeText style={[{ ...currentStyles, ...styles, }]}>{children}</NativeText>
  );
};
