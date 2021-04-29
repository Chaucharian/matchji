export const actionTypes = {
  RESET: "RESET",
  RESET_BOARD: "RESET_BOARD",
  INIT: "INIT",
};

export const reset = ({ amount: payload }) => ({
  type: actionTypes.RESET,
  payload,
});
export const init = ({ amount: payload }) => ({
  type: actionTypes.INIT,
  payload,
});
export const resetBoard = ({ tiles: payload }) => ({
  type: actionTypes.RESET_BOARD,
  payload,
});
