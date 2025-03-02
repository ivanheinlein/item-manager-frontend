<template>
  <v-form
    ref="form"
    v-model="isValid"
    class="im-user-form"
    :disabled="isLoading"
  >
    <v-row>
      <v-col cols="12" sm="5">
        <im-input-img
          class="mt-n2"
          v-model="user.avatar"
          avatar
          :errorMessage="errors.avatar"
          @input="clearError('avatar')"
        />
      </v-col>

      <v-col cols="12" sm="7">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.name"
              outlined
              label="Name"
              hide-details="auto"
              :prepend-icon="ICONS.label"
              :error-messages="errors.name"
              @input="clearError('name')"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.surname"
              outlined
              label="Surname"
              hide-details="auto"
              :prepend-icon="ICONS.label"
              :error-messages="errors.surname"
              @input="clearError('surname')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.email"
              outlined
              label="Email"
              hide-details="auto"
              :rules="RULES.email"
              :prepend-icon="ICONS.email"
              :error-messages="errors.email"
              @input="clearError('email')"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              transition="scale-transition"
              attach
              min-width="auto"
              :nudge-left="-34"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-on="on"
                  outlined
                  label="Birth date"
                  readonly
                  clearable
                  hide-details="auto"
                  :value="user.birthday"
                  :prepend-icon="ICONS.calendar"
                  :error-messages="errors.birthday"
                  @click:clear="user.birthday = ''"
                  @input="clearError('birthday')"
                />
              </template>

              <v-date-picker v-model="user.birthday" :max="maxDate" />
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.oldPassword"
              type="password"
              outlined
              label="Old password"
              hide-details="auto"
              :prepend-icon="ICONS.key"
              :error-messages="errors.oldPassword"
              @input="clearError('oldPassword')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.newPassword"
              type="password"
              outlined
              label="New password"
              hide-details="auto"
              :prepend-icon="ICONS.key"
              :error-messages="errors.newPassword"
              @input="clearError('newPassword')"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.newPasswordConfirm"
              type="password"
              outlined
              label="Confirm new password"
              hide-details="auto"
              :prepend-icon="ICONS.key"
              :error-messages="errors.newPasswordConfirm"
              @input="clearError('newPasswordConfirm')"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-5">
          <v-btn
            color="success"
            large
            :loading="isLoading"
            :disabled="isLoading || !isEdited"
            @click="saveHandler"
          >
            Save
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isEqual } from 'lodash';
import ImInputImg from '@/components/UI/InputImg.vue';
import RULES, { checkRule } from '@/assets/js/lib/rules';
import ICONS from '@/assets/js/config/icons/index';
import { formatDate } from '@/assets/js/lib/date';
import { getEmptyUser, getEmptyUserErrors } from '@/assets/js/lib/dto';
import { converErrorArrToObj } from '@/assets/js/lib/error';

export default {
  name: 'ImUserForm',
  components: {
    ImInputImg,
  },
  data() {
    return {
      isLoading: false,
      isValid: false,
      user: this.mergeUser(),
      originUser: this.mergeUser(),
      errors: getEmptyUserErrors(),
      maxDate: formatDate(new Date()),
    };
  },
  computed: {
    ...mapState('user', { storeUser: 'user' }),
    ICONS() {
      return ICONS;
    },
    RULES() {
      return RULES;
    },
    dateOutput() {
      return formatDate(this.user.birthday);
    },
    isEdited() {
      return !isEqual(this.originUser, this.user);
    },
  },
  watch: {
    storeUser(val) {
      this.originUser = this.mergeUser(val);
      this.user = this.mergeUser(val);
    },
  },
  created() {
    this.originUser = this.mergeUser(this.storeUser);
    this.user = this.mergeUser(this.storeUser);
  },
  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
    }),
    clearError(key) {
      if (this.errors[key]) this.errors[key] = '';
    },
    mergeUser(val = null) {
      const user = getEmptyUser();
      if (!val) return user;
      Object.keys(user).forEach((key) => {
        user[key] = val[key] || user[key];
      });
      return user;
    },
    validatePassword() {
      let valid = true;
      const { oldPassword, newPassword, newPasswordConfirm } = this.user;

      if (oldPassword === '' && newPassword === '') return valid;

      this.errors.oldPassword = checkRule(oldPassword, RULES.password);
      this.errors.newPassword = checkRule(newPassword, RULES.password);

      if (newPassword !== newPasswordConfirm) {
        const errorMsg = 'Confirm password is not equal to new password';
        this.errors.newPasswordConfirm = errorMsg;
      }

      valid = !(
        this.errors.oldPassword
        || this.errors.newPassword
        || this.errors.newPasswordConfirm
      );

      return valid;
    },
    saveHandler() {
      this.$refs.form.validate();
      if (!this.isValid) return;
      if (!this.validatePassword()) return;

      this.isLoading = true;
      this.updateUser({ ...this.user })
        .catch((err) => {
          this.errors = { ...this.errors, ...converErrorArrToObj(err.errors) };
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.im-user-form {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
