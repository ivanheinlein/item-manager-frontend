import {
  axiosGetGroup,
  axiosAddToGroup,
  axiosDeleteFromGroup,
  axiosConfirmAddToGroup,
} from '@/assets/js/api/group';
import { showError, showSuccess } from '@/store/snackBar';
import { formatDate } from '@/assets/js/lib/date';

const parseUser = (user) => {
  const copy = { ...user };
  if (copy.birthday) copy.birthday = formatDate(new Date(copy.birthday));
  return Object.freeze(user);
};

export default {
  namespaced: true,
  state: {
    group: [],
  },
  getters: {},
  mutations: {
    SET_GROUP(state, val) {
      state.group = val;
    },
    ADD_TO_GROUP(state, val) {
      state.group.push(val);
    },
    REMOVE_FROM_GROUP(state, val) {
      state.group = state.group.filter(({ id }) => id !== val.id);
    },
    CLEAR_STATE(state) {
      state.group = [];
    },
  },
  actions: {
    getGroup({ state, commit }) {
      if (state.group.length > 0) return Promise.resolve(state.group);

      return axiosGetGroup()
        .then((res) => {
          const group = res.data.data.users.map(parseUser);
          commit('SET_GROUP', group);
          return Promise.resolve(group);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
    addToGroup({ commit }, data) {
      return axiosAddToGroup(data)
        .then((res) => {
          showSuccess(commit, res.data.message);
          return Promise.resolve(res);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
    confirmAddToGroup({ commit, dispatch }, data) {
      return axiosConfirmAddToGroup(data)
        .then((res) => {
          const { friend } = res.data.data;
          commit('ADD_TO_GROUP', friend);
          dispatch('category/getCategories', { forse: true }, { root: true });
          commit('message/REMOVE_MESSAGE', data.messageId, { root: true });
          return Promise.resolve(friend);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
    deleteFromGroup({ commit, dispatch }, data) {
      return axiosDeleteFromGroup(data)
        .then(() => {
          commit('REMOVE_FROM_GROUP', data);
          dispatch('category/getCategories', { forse: true }, { root: true });
          return Promise.resolve(data);
        })
        .catch((err) => {
          showError(commit, err.message);
          return Promise.reject(err);
        });
    },
  },
};
