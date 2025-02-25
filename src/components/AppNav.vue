<template>
  <div class="im-nav">
    <im-app-bar />
    <im-app-aside />
  </div>
</template>

<script>
import ImAppBar from '@/components/AppBar.vue';
import ImAppAside from '@/components/AppAside.vue';

export default {
  name: 'ImAppNav',
  components: {
    ImAppBar,
    ImAppAside,
  },
};
</script>

<style lang="scss">
  .im-nav {
    z-index: 2;
  }
</style>
