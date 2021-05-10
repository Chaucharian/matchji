export const actionTypes = {
  ADD_TIME: "ADD_TIME",
  NEXT_LEVEL: "NEXT_LEVEL",
  PAUSE: "PAUSE"
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