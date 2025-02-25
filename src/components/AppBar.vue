<template>
  <v-app-bar>
    <v-icon size="40" class="mr-4">$logo</v-icon>
    <v-toolbar-title>
      {{ curPageTitle }}
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon @click="toggleNav" color="primary" />
  </v-app-bar>
</template>

<script>
import toggleNavMixin from '@/assets/js/mixins/toggleNav';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImAppBar',
  mixins: [toggleNavMixin],
  computed: {
    curPageTitle() {
      const curPage = Object.values(PAGES).find(({ name }) => name === this.$route.name);
      return curPage?.title;
    },
  },
};
</script>

<style lang="scss">
</style>
