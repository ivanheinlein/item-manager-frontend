import Vue from 'vue';
import {
  axiosGetCategories,
  axiosGetCategory,
  axiosCreateCategory,
  axiosUpdateCategory,
  axiosDeleteCategory,
} from '@/assets/js/api/category';
import { showError, showSuccess } from '@/store/snackBar';

const parseCategory = (category) => Object.freeze(category);

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories.map(parseCategory);
    },
    SET_CATEGORY(state, category) {
      state.categories.push(parseCategory(category));
    },
    UPDATE_CATEGORY(state, category) {
      const index = state.categories.findIndex(({ id }) => id === category.id);
      if (index === -1) return;
      Vue.set(state.categories, index, parseCategory(category));
    },
    DELETE_CATEGORY(state, id) {
      state.categories = state.categories.filter((category) => category.id !== id);
    },
    CLEAR_STATE(state) {
      state.categories = [];
    },
  },
  actions: {
    getCategories({ commit, state }, opt = { forse: false }) {
      if (state.categories.length > 0 && !opt.forse) {
        return Promise.resolve(state.categories);
      }

      return axiosGetCategories()
        .then((res) => {
          const { categories } = res.data.data;
          commit('SET_CATEGORIES', categories);
          return Promise.resolve(categories);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    getCategory({ state, commit }, id) {
      const categoryFromStore = state.categories.find((category) => category.id === id);
      if (categoryFromStore) return Promise.resolve(categoryFromStore);

      return axiosGetCategory(id)
        .then((res) => Promise.resolve(res.data.data.category))
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    createCategory({ commit }, data) {
      return axiosCreateCategory(data)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          const { category } = res.data.data;
          commit('SET_CATEGORY', category);
          return Promise.resolve(category);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    updateCategory({ commit }, { id, data }) {
      return axiosUpdateCategory(id, data)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          const { category } = res.data.data;
          commit('UPDATE_CATEGORY', category);
          return Promise.resolve(category);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    deleteCategory({ commit }, id) {
      return axiosDeleteCategory(id)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          commit('DELETE_CATEGORY', id);
          return Promise.resolve();
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
  },
};
