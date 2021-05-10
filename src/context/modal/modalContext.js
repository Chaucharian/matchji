import React, {
  useContext,
  createContext,
  useReducer,
} from "react";
import { actionTypes } from "./actions";

const ModalContext = createContext();

const initialState = {
  show: false,
  content: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.OPEN: {
      const { show, content } = action.payload;

      return { ...state, show, content };
    }
  }
};

export const ModalProvider = ({ children, ...options }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if(context === undefined) {
    throw new Error("useModalContext must be used inside ModalProvider");
  }
  return context;
}
