export const actionTypes = {
  OPEN: "OPEN",
};

export const open = (payload) => ({
  type: actionTypes.OPEN,
  payload,
});