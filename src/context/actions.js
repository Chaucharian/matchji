export const actionTypes = {
  RESET: "RESET",
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
