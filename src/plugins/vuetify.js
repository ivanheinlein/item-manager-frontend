import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import Logo from '@/components/icons/Logo.vue';

const ICONS = {
  logo: { component: Logo },
};

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: ICONS,
  },
});
