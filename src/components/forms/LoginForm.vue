<template>
  <v-form ref="form" v-model="isValid" class="im-login-form">
    <v-text-field
      class="mb-4"
      v-model="user.email"
      outlined
      label="Email"
      hide-details="auto"
      data-cy="login-form-email-input"
      :rules="RULES.email"
      :prepend-inner-icon="ICONS.label"
    />

    <v-text-field
      class="mb-4"
      v-model="user.password"
      outlined
      type="password"
      label="Password"
      hide-details="auto"
      data-cy="login-form-password-input"
      :rules="RULES.required"
      :prepend-inner-icon="ICONS.key"
    />

    <v-btn
      color="success"
      large
      width="100%"
      data-cy="login-form-submit-btn"
      :loading="isLoading"
      :disabled="isLoading"
      @click="submitHandler"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import ICONS from '@/assets/js/config/icons/index';
import PAGES from '@/assets/js/config/pages/index';
import RULES from '@/assets/js/lib/rules';

export default {
  name: 'ImLoginForm',
  data() {
    return {
      isValid: false,
      isLoading: false,
      user: {
        login: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    submitHandler() {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;

      const { email, password } = this.user;

      this.login({ email, password })
        .then(() => {
          this.$router.push({ name: PAGES.items.name });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  computed: {
    ICONS() {
      return ICONS;
    },
    RULES() {
      return RULES;
    },
  },
};
</script>

<style lang="scss">
.im-login-form {
}
</style>
