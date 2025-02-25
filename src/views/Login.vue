<template>
  <div class="im-login">
    <v-container class="im-login__inner">
      <v-icon size="200" class="mx-auto d-block mb-4">$logo</v-icon>

      <im-login-form class="pb-3"/>

      <v-btn text width="100%" :to="{ name: PAGES.registration.name }">
        Registration
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import ImLoginForm from '@/components/forms/LoginForm.vue';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImLogin',
  components: {
    ImLoginForm,
  },
  computed: {
    PAGES() {
      return PAGES;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index';

.im-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__inner {
    @include media('>tiny') {
      max-width: 400px;
    }

    @include media('<=tiny') {
      width: 100%;
    }
  }
}
</style>
