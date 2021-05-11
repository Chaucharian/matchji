import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, open } from "./actions";
import { MenuTemplate, WinTemplate } from "./templates";

const ModalContext = createContext();

export const MODAL_TYPES = {
  MENU: "MENU",
  WIN: "WIN",
  GAME_OVER: "GAME_OVER",
};

const initialState = {
  show: false,
  content: <></>,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.OPEN: {
      const { show, type } = action.payload;
      let content;

      if (type === MODAL_TYPES.MENU) {
        content = <MenuTemplate />;
      } else if (type === MODAL_TYPES.WIN) {
        content = <WinTemplate />;
      }

      return { ...state, show, content };
    }
  }
};

export const ModalProvider = ({ children, ...options }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const dispatch = useMemo(
    () => ({
      openMenu: (payload) =>
        dispatcher(open({ ...payload, type: MODAL_TYPES.MENU })),
      openWin: (payload) =>
        dispatcher(open({ ...payload, type: MODAL_TYPES.WIN })),
      openGameOver: (payload) =>
        dispatcher(open({ ...payload, type: MODAL_TYPES.GAME_OVER })),
    }),
    [dispatcher]
  );

  const context = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used inside ModalProvider");
  }
  return context;
};
