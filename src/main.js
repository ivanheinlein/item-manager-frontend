import Vue from 'vue';
import permitions from '@/assets/js/config/pages/permitions';
import pages from '@/assets/js/config/pages/index';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import filters from './assets/js/filters/index';

Vue.config.productionTip = false;

Object.entries(filters).forEach(([key, value]) => {
  Vue.filter(key, value);
});

router.beforeEach(async (to, from, next) => {
  const user = await store.dispatch('user/checkAuth').catch((err) => {
    console.error(err);
  });
  const isAuth = !!user?.id;

  if (to.meta[permitions.forVisitor] && isAuth) {
    return next({ name: pages.items.name });
  }

  if (to.meta[permitions.forAuth] && !isAuth) {
    return next({ name: pages.login.name });
  }

  return next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
