import {
  axiosGetItem,
  axiosGetItems,
  axiosCreateItem,
  axiosUpdateItem,
  axiosDeleteItem,
} from '@/assets/js/api/item';
import { showError, showSuccess } from '@/store/snackBar';

const parseItem = (item) => Object.freeze(item);

export default {
  namespaced: true,
  state: {
    items: [],
    total: 0,
  },
  getters: {},
  mutations: {
    TOGGLE_NAV(state, val) {
      state.isNavOpened = val;
    },
    SET_ITEMS(state, val) {
      state.items = val.map(parseItem);
    },
    ADD_ITEMS(state, val) {
      state.items = [...state.items, ...val.map(parseItem)];
    },
    SET_TOTAL(state, val) {
      state.total = val;
    },
    CLEAR_STATE(state) {
      state.items = [];
      state.total = 0;
    },
  },
  actions: {
    getItem({ state, commit }, id) {
      const curItem = state.items.find((item) => item.id === id);
      if (curItem) return Promise.resolve(curItem);

      return axiosGetItem(id)
        .then((res) => Promise.resolve(res.data.data.item))
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    getItems({ commit }, opt) {
      return axiosGetItems(opt)
        .then((res) => {
          const { rows: items, count } = res.data.data;

          if (opt.page === 1) {
            commit('SET_ITEMS', items);
          } else {
            commit('ADD_ITEMS', items);
          }

          commit('SET_TOTAL', count);
          return Promise.resolve(items);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    createItem({ commit }, data) {
      return axiosCreateItem(data)
        .then((res) => {
          const { data: item, message } = res.data;
          showSuccess(commit, message);
          return Promise.resolve(item);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    updateItem({ commit }, { data, id }) {
      return axiosUpdateItem(id, data)
        .then((res) => {
          const { data: item, message } = res.data;
          showSuccess(commit, message);
          return Promise.resolve(item);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
    deleteItem({ commit }, id) {
      return axiosDeleteItem(id)
        .then((res) => {
          const { message } = res.data;
          showSuccess(commit, message);
          return Promise.resolve(res);
        })
        .catch((err) => {
          showError(commit, err);
          return Promise.reject(err.response.data);
        });
    },
  },
};
