<template>
  <v-navigation-drawer
    class="im-aside"
    v-model="isNavOpened"
    absolute
    right
    temporary
  >
    <v-list>
      <v-subheader class="d-flex align-center justify-space-between py-2">
        <span>Navigation</span>
        <v-btn icon dense large @click="toggleNav" color="primary">
          <v-icon>{{ ICONS.close }}</v-icon>
        </v-btn>
      </v-subheader>

      <v-avatar color="grey" size="100" class="mx-auto d-block mb-4">
        <v-img v-if="user.avatar" :src="user.avatar | serverImgPath" />
        <im-img-stub v-else avatar />
      </v-avatar>

      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          router
          color="primary"
          :key="i"
          :to="{ name: item.route }"
          :exact="true"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="loguotHandler">
          <v-list-item-icon>
            <v-icon>
              {{ ICONS.logout }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import toggleNavMixin from '@/assets/js/mixins/toggleNav';
import ImImgStub from '@/components/UI/ImgStub.vue';
import PAGES from '@/assets/js/config/pages/index';
import ICONS from '@/assets/js/config/icons/index';

export default {
  name: 'ImAppAside',
  mixins: [toggleNavMixin],
  components: {
    ImImgStub,
  },
  data() {
    return {
      items: [
        { text: 'Account', icon: ICONS.account, route: PAGES.account.name },
        { text: 'Items', icon: ICONS.dashboard, route: PAGES.items.name },
        {
          text: 'Categories',
          icon: ICONS.bookmark,
          route: PAGES.categories.name,
        },
        { text: 'Your group', icon: ICONS.group, route: PAGES.group.name },
        {
          text: 'Create item',
          icon: ICONS.plusBox,
          route: PAGES.itemCreate.name,
        },
      ],
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ICONS() {
      return ICONS;
    },
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    loguotHandler() {
      this.logout().then(() => {
        this.$router.push({ name: PAGES.login.name });
      });
    },
  },
};
</script>

<style lang="scss">
.im-aside {
  z-index: 2 !important;
}
</style>
