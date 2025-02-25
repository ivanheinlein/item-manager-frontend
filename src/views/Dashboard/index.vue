<template>
  <div class="im-dashboard">
    <im-app-nav />

    <v-main :class="'im-dashboard-main'">
      <router-view />
    </v-main>

    <im-messages-card />
  </div>
</template>

<script>
import ImAppNav from '@/components/AppNav.vue';
import ImMessagesCard from '@/components/messages/MessagesCard.vue';

export default {
  name: 'ImDashboard',
  components: {
    ImAppNav,
    ImMessagesCard,
  },
};
</script>

<style lang="scss">
.im-dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &-main {
    flex: 1 !important;
    overflow-y: auto;
  }
}
</style>
