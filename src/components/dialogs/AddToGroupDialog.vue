<template>
  <im-dialog v-model="isOpened" class="im-add-to-groud-dialog">
    <im-add-to-group-form @submit="(val) => $emit('submit', val)" />
  </im-dialog>
</template>

<script>
import ImAddToGroupForm from '@/components/forms/AddToGroupForm.vue';
import ImDialog from './Dialog.vue';
import dialogVModelMixin from './dialogVModelMixin';

export default {
  name: 'ImAddToGroupDialog',
  components: {
    ImDialog,
    ImAddToGroupForm,
  },
  mixins: [dialogVModelMixin],
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-add-to-groud-dialog {
}
</style>
