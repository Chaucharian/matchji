import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
} from "react";
import { actionTypes, open } from "./actions";

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
  const [state, dispatcher] = useReducer(reducer, initialState);

  const dispatch = useMemo( () => ({
    open: (payload) => dispatcher(open(payload)),
   }), [dispatcher]);

  const context = useMemo( () => ({ state, dispatch }), [state, dispatch]);

  return (
    <ModalContext.Provider
      value={context}
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
