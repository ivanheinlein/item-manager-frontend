import { axiosGetMessages, axiosDeleteMessage } from '@/assets/js/api/message';
import { showError } from '@/store/snackBar';

export default {
  namespaced: true,
  state: {
    messages: [],
  },
  getters: {},
  mutations: {
    SET_MESSAGES(state, val) {
      state.messages = val;
    },
    REMOVE_MESSAGE(state, mesId) {
      state.messages = state.messages.filter(({ id }) => id !== mesId);
    },
    CLEAR_STATE(state) {
      state.messages = [];
    },
  },
  actions: {
    getMessages({ commit }) {
      return axiosGetMessages()
        .then((res) => {
          const messages = res.data.data.messages.map(Object.freeze);
          commit('SET_MESSAGES', messages);
          return Promise.resolve(messages);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
    deleteMessage({ commit }, messageId) {
      return axiosDeleteMessage(messageId)
        .then(() => {
          commit('REMOVE_MESSAGE', messageId);
          return Promise.resolve(messageId);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
  },
};
