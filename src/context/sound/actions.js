export const actionTypes = {
  PLAY: "PLAY",
};

export const play = (payload) => ({
  type: actionTypes.PLAY,
  payload,
});