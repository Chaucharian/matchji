export const actionTypes = {
  RESET: "RESET",
  RESET_BOARD: "RESET_BOARD",
  INIT: "INIT",
  HIDE: "HIDE",
  REMOVE: "REMOVE",
};

export const reset = (payload) => ({
  type: actionTypes.RESET,
  payload,
});
export const init = (payload) => ({
  type: actionTypes.INIT,
  payload,
});
export const resetBoard = (payload) => ({
  type: actionTypes.RESET_BOARD,
  payload,
});
export const remove = (payload) => ({
  type: actionTypes.REMOVE,
  payload,
});
export const hide = (payload) => ({
  type: actionTypes.HIDE,
  payload,
});
