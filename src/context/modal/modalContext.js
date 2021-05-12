import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, open } from "./actions";
import { MODAL_TYPES } from '../../const/variables';

const ModalContext = createContext();

const initialState = {
  show: false,
  type: MODAL_TYPES.MENU
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.OPEN: {
      const { show, type } = action.payload;

      return { ...state, show, type };
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