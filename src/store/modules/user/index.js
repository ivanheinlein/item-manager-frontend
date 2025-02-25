import axios from 'axios';
import {
  axiosRgistration,
  axiosLogin,
  axiosCheckAuth,
  axiosUserUpdate,
} from '@/assets/js/api/user';
import { showError, showSuccess } from '@/store/snackBar';
import { formatDate } from '@/assets/js/lib/date';

const getTokenFromStore = () => localStorage.getItem('token')?.split(' ')[1];

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, val) {
      const user = { ...val };
      if (user.birthday) user.birthday = formatDate(new Date(user.birthday));
      state.user = user;
    },
    UPDATE_TOKEN(state, val = null) {
      if (val) {
        const token = `Bearer ${val}`;
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = token;
        axios.defaults.headers.common['X-Access-Token'] = token;
      } else {
        state.token = null;
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        delete axios.defaults.headers.common['X-Access-Token'];
      }
    },
    CLEAR_STATE(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    registration({ commit }, data) {
      return axiosRgistration(data)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          const { user, token } = res.data.data;
          commit('UPDATE_TOKEN', token);
          commit('SET_USER', user);
          return Promise.resolve(user);
        })
        .catch((err) => {
          showError(commit, err.response.data.message);
          return Promise.reject(err.response.data);
        });
    },
    login({ commit }, data) {
      return axiosLogin(data)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          const { user, token } = res.data.data;
          commit('UPDATE_TOKEN', token);
          commit('SET_USER', user);
          return Promise.resolve(user);
        })
        .catch((err) => {
          showError(commit, err.response.data.message);
          return Promise.reject(err.response.data);
        });
    },
    checkAuth({ commit, state }) {
      if (state.user?.id) return Promise.resolve(state.user);

      const tokenInLocalStore = getTokenFromStore();
      if (!tokenInLocalStore) return Promise.reject(new Error('Token is empty'));

      commit('UPDATE_TOKEN', tokenInLocalStore);

      return axiosCheckAuth()
        .then((res) => {
          const { user, token } = res.data.data;
          commit('UPDATE_TOKEN', token);
          commit('SET_USER', user);
          return Promise.resolve(user);
        })
        .catch((err) => Promise.reject(err.response.data));
    },
    updateUser({ commit }, data) {
      return axiosUserUpdate(data)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          const { user, token } = res.data.data;
          commit('UPDATE_TOKEN', token);
          commit('SET_USER', user);
          return Promise.resolve(user);
        })
        .catch((err) => {
          showError(commit, err.response.data.message);
          return Promise.reject(err.response.data);
        });
    },
    logout({ commit, dispatch }) {
      commit('UPDATE_TOKEN', null);
      commit('SET_USER', null);
      dispatch('clearState', null, { root: true });
      return Promise.resolve();
    },
  },
};
