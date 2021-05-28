import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, changeTheme } from "./actions";

export const ThemeContext = createContext();

const initialState = {
  dark: false,
  primary: "#fdf9ef",
  secondary: "#f6e9c2",
  mainButton: { color: "#FFF", backgroundColor: "#00AF65", borderColor: "#039055", borderWidth: 3 },
  icon: { primary: "#FFF" },
  modal: {
    primary: "#FFF",
  },
  fonts: {
    button: {
      color: "#393939",
      // fontWeight: "bold",
      fontFamily: "RubikOne-Regular",
      fontSize: 20
    },
    title: { fontSize: 30, color: "#000", fontFamily: "RubikOne-Regular" },
    subtitle: { color: "#AAAAAA", fontFamily: "RubikOne-Regular" },
    body: { color: "#000", fontSize: 18, fontFamily: "RubikOne-Regular" },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME: {
      const { dark, fonts, modal, icon } = state;
      const newDark = !dark;
      let primary, secondary;
      let newFonts = { ...fonts };
      let newModal = { ...modal };
      let newIcon = { ...icon };

      if (dark) {
        primary = initialState.primary;
        secondary = initialState.secondary;
        newFonts = initialState.fonts;
        newModal = initialState.modal;
        newIcon = initialState.icon;
      } else {
        primary = "#212121";
        secondary = "#191919";
        newModal = {
          primary: "#171717"
        }
        newIcon = {
          primary: "#000"
        }
        newFonts = {
          body: { ...fonts.button, color: "#FFF" },
          button: { ...fonts.button, color: "#FFF" },
          title: { ...fonts.title, color: "#FFF" },
          subtitle: { ...fonts.subtitle, color: "#FFF" },
        };
      }

      return { ...state, primary, secondary, fonts: newFonts, modal: newModal, icon: newIcon, dark: newDark };
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
