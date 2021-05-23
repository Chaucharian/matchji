import React, { useContext, createContext, useReducer, useMemo } from "react";
import { actionTypes, initGame, showTutorial, goMenu, mute } from "./actions";
import { GAME_MODES } from "../../const/variables";

const GeneralContext = createContext();

const initialState = {
  // showClassicTutorial: true,
  // showZenTutorial: true,
  currentMode: null,
  currentLevel: 1,
  isMusicMute: false,
  isSoundMute: false,
  isFirstTimeClassic: true,
  isFirstTimeZen: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT_GAME: {
      const { mode } = action.payload;

      return { ...state, currentMode: mode };
    }
    case actionTypes.MUTE: {
      const { type } = action.payload;
      const { isSoundMute, isMusicMute } = state;
      let newIsSoundMute = isSoundMute;
      let newIsMusicMute = isMusicMute;

      if(type === 'music') {
        newIsMusicMute = !newIsMusicMute;
      } else {
        newIsSoundMute = !newIsSoundMute;
      }

      return {
        ...state,
        isSoundMute: newIsSoundMute,
        isMusicMute: newIsMusicMute
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
      muteMusic: () => dispatcher(mute({ type: 'music' })),
      muteSound: () => dispatcher(mute({ type: 'sound' })),
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
