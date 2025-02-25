import Vue from 'vue';
import Vuex from 'vuex';

import item from './modules/item';
import category from './modules/category';
import user from './modules/user';
import group from './modules/group';
import message from './modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpened: false,
    snackbar: {
      isShow: false,
      message: '',
      color: '',
      timeout: 3000,
    },
  },
  getters: {},
  mutations: {
    TOGGLE_NAV(state, val) {
      state.isNavOpened = val;
    },
    SET_SNACKBAR(state, val) {
      state.snackbar = { ...state.snackbar, isShow: true, ...val };
    },
  },
  actions: {
    clearState({ commit }) {
      commit('item/CLEAR_STATE');
      commit('category/CLEAR_STATE');
      commit('user/CLEAR_STATE');
      commit('group/CLEAR_STATE');
      commit('message/CLEAR_STATE');
    },
  },
  modules: {
    item,
    category,
    user,
    group,
    message,
  },
});
