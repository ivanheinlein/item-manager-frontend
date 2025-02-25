<template>
  <im-dialog v-model="isOpened" class="im-confirm-dialog">
    <h3 class="pb-3">Are you sure?</h3>
    <v-btn
      class="mb-4"
      color="success"
      large
      width="100%"
      @click="$emit('submit')"
    >
      Confirm
    </v-btn>

    <v-btn color="error" large width="100%" @click="$emit('cancel')">
      Cancel
    </v-btn>
  </im-dialog>
</template>

<script>
import ImDialog from './Dialog.vue';
import dialogVModelMixin from './dialogVModelMixin';

export default {
  name: 'ImConfirmDialog',
  components: {
    ImDialog,
  },
  mixins: [dialogVModelMixin],
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-confirm-dialog {
}
</style>
