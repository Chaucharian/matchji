export const actionTypes = {
  RESET: "RESET",
  RESET_BOARD: "RESET_BOARD",
  INIT: "INIT",
  HIDE: "HIDE",
  HIDE_ALL: "HIDE_ALL",
  REMOVE: "REMOVE",
  SHOW: "SHOW",
  SHOW_ALL: "SHOW_ALL",
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
export const show = (payload) => ({
  type: actionTypes.SHOW,
  payload,
});
export const hideAll = (payload) => ({
  type: actionTypes.HIDE_ALL,
  payload,
});
