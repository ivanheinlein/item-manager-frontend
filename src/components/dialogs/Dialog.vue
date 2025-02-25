<template>
  <v-dialog v-model="isOpened" :max-width="maxWidth">
    <div class="im-dialog">
      <v-btn icon class="im-dialog__btn" @click="isOpened = false">
        <v-icon>{{ ICONS.close }}</v-icon>
      </v-btn>
      <slot></slot>
    </div>
  </v-dialog>
</template>

<script>
import ICONS from '@/assets/js/config/icons/index';
import dialogVModelMixin from './dialogVModelMixin';

export default {
  name: 'ImDialog',
  mixins: [dialogVModelMixin],
  props: {
    maxWidth: {
      type: String,
      default: '400px',
    },
  },
  computed: {
    ICONS() {
      return ICONS;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-dialog {
  background-color: #fff;
  padding: 20px;

  &__btn {
    float: right;
    transform: translate(10px, -10px);
  }
}
</style>
