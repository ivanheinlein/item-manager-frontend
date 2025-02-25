import Vue from 'vue';
import VueRouter from 'vue-router';
import PAGES from '@/assets/js/config/pages/index';
import Dashboard from '@/views/Dashboard/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: PAGES.dashboard.path,
    name: PAGES.dashboard.name,
    meta: PAGES.dashboard.meta,
    component: Dashboard,
    children: [
      {
        path: PAGES.items.path,
        name: PAGES.items.name,
        meta: PAGES.items.meta,
        component: () => import('@/views/Dashboard/childrens/Items.vue'),
      },
      {
        path: PAGES.account.path,
        name: PAGES.account.name,
        meta: PAGES.account.meta,
        component: () => import('@/views/Dashboard/childrens/Account.vue'),
      },
      {
        path: PAGES.itemCreate.path,
        name: PAGES.itemCreate.name,
        meta: PAGES.itemCreate.meta,
        component: () => import('@/views/Dashboard/childrens/ItemCreate.vue'),
      },
      {
        path: PAGES.itemUpdate.path,
        name: PAGES.itemUpdate.name,
        meta: PAGES.itemUpdate.meta,
        component: () => import('@/views/Dashboard/childrens/ItemUpdate.vue'),
      },
      {
        path: PAGES.categories.path,
        name: PAGES.categories.name,
        meta: PAGES.categories.meta,
        component: () => import('@/views/Dashboard/childrens/Categories.vue'),
      },
      {
        path: PAGES.categoryCreate.path,
        name: PAGES.categoryCreate.name,
        meta: PAGES.categoryCreate.meta,
        component: () => import('@/views/Dashboard/childrens/CategoryCreate.vue'),
      },
      {
        path: PAGES.categoryUpdate.path,
        name: PAGES.categoryUpdate.name,
        meta: PAGES.categoryUpdate.meta,
        component: () => import('@/views/Dashboard/childrens/CategoryUpdate.vue'),
      },
      {
        path: PAGES.group.path,
        name: PAGES.group.name,
        meta: PAGES.group.meta,
        component: () => import('@/views/Dashboard/childrens/Group.vue'),
      },
    ],
  },
  {
    path: PAGES.login.path,
    name: PAGES.login.name,
    meta: PAGES.login.meta,
    component: () => import('@/views/Login.vue'),
  },
  {
    path: PAGES.registration.path,
    name: PAGES.registration.name,
    meta: PAGES.registration.meta,
    component: () => import('@/views/Registration.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
