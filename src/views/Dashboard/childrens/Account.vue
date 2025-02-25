<template>
  <v-container class="im-account">
    <im-user-form />
  </v-container>
</template>

<script>
import ImUserForm from '@/components/forms/UserForm.vue';

export default {
  name: 'ImAccount',
  components: {
    ImUserForm,
  },
};
</script>

<style lang="scss">
.im-account {
}
</style>
