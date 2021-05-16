import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, changeTheme } from "./actions";

const ThemeContext = createContext();

const initialState = {
  dark: false,
  primary: "#fdf9ef",
  secondary: "#f6e9c2",
  fonts: {
    button: {
      color: "#AAAAAA",
    },
    title: { fontSize: 30, fontWeight: "bold", color: "#AAAAAA" },
    subtitle: { color: "#AAAAAA" },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME: {
      const { dark, fonts } = state;
      const newDark = !dark;
      let primary, secondary;
      let newFonts = { ...fonts };

      if (dark) {
        primary = initialState.primary;
        secondary = initialState.secondary;
        newFonts = initialState.fonts;
      } else {
        primary = "#212121";
        secondary = "#191919";
        newFonts = {
          button: { ...fonts.button, color: "#FFF" },
          title: { ...fonts.title, color: "#FFF" },
          subtitle: { ...fonts.subtitle, color: "#FFF" },
        };
      }

      return { ...state, primary, secondary, fonts: newFonts, dark: newDark };
    }
  }
};

export const ThemeProvider = ({ children, ...options }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const dispatch = useMemo(
    () => ({
      changeTheme: () => dispatcher(changeTheme()),
    }),
    [dispatcher]
  );

  const context = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }
  return context;
};
