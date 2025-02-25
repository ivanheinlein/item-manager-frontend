<template>
  <v-app :class="'im-app'">
    <router-view />

    <v-snackbar
      top
      v-model="snackbar.isShow"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ImApp',
  computed: {
    ...mapState(['snackbar']),
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/framework/index';

  html {
    overflow: hidden !important;
  }

  .im-app {
    overflow: hidden;
    height: 100vh;
  }
</style>
