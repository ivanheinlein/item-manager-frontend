<template>
  <v-form
    ref="form"
    v-model="isValid"
    class="im-registration-form"
    :disabled="isLoading"
  >
    <v-text-field
      class="mb-4"
      v-model="user.email"
      outlined
      label="Email"
      hide-details="auto"
      :rules="RULES.email"
      :prepend-inner-icon="ICONS.email"
      :error-messages="errors.email"
      @input="clearError('email')"
    />

    <v-text-field
      class="mb-4"
      v-model="user.password"
      outlined
      type="password"
      label="Password"
      hide-details="auto"
      :rules="RULES.password"
      :prepend-inner-icon="ICONS.key"
      :error-messages="errors.password"
      @input="clearError('password')"
    />

    <v-text-field
      class="mb-4"
      v-model="user.confirmdPassword"
      outlined
      type="password"
      label="Confirm password"
      hide-details="auto"
      :rules="RULES.password"
      :prepend-inner-icon="ICONS.key"
      :error-messages="errors.confirmdPassword"
      @input="clearError('confirmdPassword')"
    />

    <v-btn
      color="success"
      large
      width="100%"
      :loading="isLoading"
      :disabled="isLoading"
      @click="submitHandler"
    >
      Registration
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import ICONS from '@/assets/js/config/icons/index';
import RULES from '@/assets/js/lib/rules';
import PAGES from '@/assets/js/config/pages/index';
import { converErrorArrToObj } from '@/assets/js/lib/error';

export default {
  name: 'ImRegistrationForm',
  data() {
    return {
      isValid: false,
      isLoading: false,
      user: {
        email: '',
        password: '',
        confirmdPassword: '',
      },
      errors: {
        email: '',
        password: '',
        confirmdPassword: '',
      },
    };
  },
  methods: {
    ...mapActions({
      registration: 'user/registration',
    }),
    clearError(key) {
      if (this.errors[key]) this.errors[key] = '';
    },
    submitHandler() {
      if (!this.$refs.form.validate()) return;
      if (this.user.password !== this.user.confirmdPassword) {
        this.errors.confirmdPassword = 'Confirm password not equal with password';
        return;
      }

      this.isLoading = true;

      const { email, password } = this.user;

      this.registration({ email, password })
        .then(() => {
          this.$router.push({ name: PAGES.items.name });
        })
        .catch((err) => {
          this.errors = { ...this.errors, ...converErrorArrToObj(err.errors) };
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
.im-registration-form {
}
</style>
