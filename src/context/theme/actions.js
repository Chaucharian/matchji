export const actionTypes = {
  CHANGE_THEME: "CHANGE_THEME"
};

export const changeTheme = (payload) => ({
  type: actionTypes.CHANGE_THEME,
  payload,
});
