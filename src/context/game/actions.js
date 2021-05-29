export const actionTypes = {
  ADD_TIME: "ADD_TIME",
  NEXT_LEVEL: "NEXT_LEVEL",
  RESET_LEVEL: "RESET_LEVEL",
  RANDOM_LEVEL: "RANDOM_LEVEL",
  RESET_LAYOUT: "RESET_LAYOUT",
  RESET_TIMER: "RESET_TIMER",
  PAUSE: "PAUSE",
  GAME_OVER: "GAME_OVER"
};

export const addTime = (payload) => ({
  type: actionTypes.ADD_TIME,
  payload,
});
export const nextLevel = (payload) => ({
  type: actionTypes.NEXT_LEVEL,
  payload,
});
export const pause = (payload) => ({
  type: actionTypes.PAUSE,
  payload,
});
export const gameOver = (payload) => ({
  type: actionTypes.GAME_OVER,
  payload,
});
export const resetLayout = (payload) => ({
  type: actionTypes.RESET_LAYOUT,
  payload,
});
export const resetTimer = (payload) => ({
  type: actionTypes.RESET_TIMER,
  payload,
});
export const resetLevel = (payload) => ({
  type: actionTypes.RESET_LEVEL,
  payload,
});
export const randomLevel = (payload) => ({
  type: actionTypes.RANDOM_LEVEL,
  payload,
});