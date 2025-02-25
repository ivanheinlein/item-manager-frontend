import permitions from './permitions';

export default {
  dashboard: {
    path: '/',
    name: 'Dashboard',
    title: 'Dashboard',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  items: {
    path: '',
    name: 'Items',
    title: 'Items',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  account: {
    path: '/account',
    name: 'Account',
    title: 'Account',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  login: {
    path: '/login',
    name: 'Login',
    title: 'Login',
    meta: {
      [permitions.forVisitor]: true,
    },
  },
  registration: {
    path: '/registration',
    name: 'Registration',
    title: 'Registration',
    meta: {
      [permitions.forVisitor]: true,
    },
  },
  itemCreate: {
    path: '/item',
    name: 'ItemCreate',
    title: 'Add new item',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  itemUpdate: {
    path: '/item/:id',
    name: 'ItemUpdate',
    title: 'Edit item',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  categories: {
    path: '/categories',
    name: 'Categories',
    title: 'Categories',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  categoryCreate: {
    path: '/category',
    name: 'CategoryCreate',
    title: 'Add new category',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  categoryUpdate: {
    path: '/category/:id',
    name: 'CategoryUpdate',
    title: 'Edit category',
    meta: {
      [permitions.forAuth]: true,
    },
  },
  group: {
    path: '/group',
    name: 'Group',
    title: 'Group',
    meta: {
      [permitions.forAuth]: true,
    },
  },
};
