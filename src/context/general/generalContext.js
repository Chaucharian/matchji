import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, initGame, showTutorial, goMenu } from "./actions";
import { GAME_MODES } from "../../const/variables";

const GeneralContext = createContext();

const initialState = {
  showClassicTutorial: true,
  showZenTutorial: true,
  currentMode: null,
  currentLevel: 1
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT_GAME: {
      const { mode } = action.payload;

      return { ...state, currentMode: mode };
    }
    case actionTypes.SHOW_TUTORIAL: {
      const { mode, show } = action.payload;
      const { showClassicTutorial, showZenTutorial } = state;
      let newShowClassicTutorial = showClassicTutorial;
      let newShowZenTutorial = showZenTutorial;

      if (mode === GAME_MODES.CLASSIC) {
        newShowClassicTutorial = show;
      } else {
        newShowZenTutorial = show;
      }

      return {
        ...state,
        showClassicTutorial: newShowClassicTutorial,
        showZenTutorial: newShowZenTutorial,
      };
    }
    case actionTypes.GO_MENU: {
      return {
        ...state,
        currentMode: null
      };
    }
  }
};

export const GeneralProvider = ({ children, ...options }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const dispatch = useMemo(
    () => ({
      initGame: () => dispatcher(initGame({ mode: GAME_MODES.CLASSIC })),
      initZenGame: () => dispatcher(initGame({ mode: GAME_MODES.ZEN })),
      showClassicTutorial: (payload) =>
        dispatcher(showTutorial({ ...payload, mode: GAME_MODES.CLASSIC })),
      showZenTutorial: (payload) => dispatcher(showTutorial({ ...payload, mode: GAME_MODES.ZEN })),
      goMenu: () => dispatcher(goMenu()),
    }),
    [dispatcher]
  );

  const context = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GeneralContext.Provider value={context}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);

  if (context === undefined) {
    throw new Error("useGeneralContext must be used inside GeneralProvider");
  }
  return context;
};
