export const actionTypes = {
  INIT_GAME: "INIT_GAME",
  SHOW_TUTORIAL: "SHOW_TUTORIAL",
  GO_MENU: "GO_MENU",
  MUTE: "MUTE",
  SET_FIRST_TIME: "SET_FIRST_TIME",
};

export const initGame = (payload) => ({
  type: actionTypes.INIT_GAME,
  payload,
});
export const showTutorial = (payload) => ({
  type: actionTypes.SHOW_TUTORIAL,
  payload,
});
export const goMenu = (payload) => ({
  type: actionTypes.GO_MENU,
  payload,
});
export const mute = (payload) => ({
  type: actionTypes.MUTE,
  payload,
});
export const setFirstTime = (payload) => ({
  type: actionTypes.SET_FIRST_TIME,
  payload,
});