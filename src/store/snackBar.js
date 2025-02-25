export const showSnacbar = (color) => (commit, message) => {
  commit('SET_SNACKBAR', { message, color }, { root: true });
};
export const showError = showSnacbar('red');
export const showSuccess = showSnacbar('green');
