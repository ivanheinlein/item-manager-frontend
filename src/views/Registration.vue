<template>
  <div class="im-registration">
    <v-container class="im-registration__inner">
      <v-icon size="200" class="mx-auto d-block mb-4">$logo</v-icon>

      <im-registration-form class="pb-3" />

      <v-btn text width="100%" :to="{ name: PAGES.login.name }">Login</v-btn>
    </v-container>
  </div>
</template>

<script>
import ImRegistrationForm from '@/components/forms/RegistrationForm.vue';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImRegistration',
  components: {
    ImRegistrationForm,
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

.im-registration {
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
