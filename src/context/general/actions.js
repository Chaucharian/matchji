export const actionTypes = {
  INIT_GAME: "INIT_GAME",
  SHOW_TUTORIAL: "SHOW_TUTORIAL",
};

export const initGame = (payload) => ({
  type: actionTypes.INIT_GAME,
  payload,
});
export const showTutorial = (payload) => ({
  type: actionTypes.SHOW_TUTORIAL,
  payload,
});