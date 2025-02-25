<template>
  <div class="im-message">
    <div class="im-message__head">
      <h3 class="pr-2">From: {{ message.user.email }}</h3>

      <v-btn
        class="ml-auto"
        icon
        dense
        small
        color="error"
        @click="deleteMessage"
      >
        <v-icon>{{ ICONS.close }}</v-icon>
      </v-btn>
    </div>

    <div class="im-message__body">
      <slot>
        <p class="subtitle-1">{{ message.text }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
import ICONS from '@/assets/js/config/icons/index';
import MessageMixin from './MessageMixin';

export default {
  name: 'ImMessage',
  mixins: [MessageMixin],
  computed: {
    ICONS() {
      return ICONS;
    },
  },
};
</script>

<style lang="scss">
.im-message {
  padding: 12px;

  &__head {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
  }

  &__body {
  }
}
</style>
