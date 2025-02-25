<template>
  <im-message
    class="im-message-confirm-group"
    :message="message"
    @delete="deleteMessage"
  >
    <p class="subtitle-1">{{ message.text }}</p>
    <div class="im-message-confirm-group-btn">
      <v-btn class="im-btn" color="success" @click="$emit('confirmGroup', message)">
        Confirm
      </v-btn>
      <v-btn class="im-btn" color="error" @click="deleteMessage">Cancel</v-btn>
    </div>
  </im-message>
</template>

<script>
import ImMessage from './Message.vue';
import MessageMixin from './MessageMixin';

export default {
  name: 'ImMessageConfrimGroup',
  components: {
    ImMessage,
  },
  mixins: [MessageMixin],
};
</script>

<style lang="scss">
.im-message-confirm-group {
  &-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;

    &>.im-btn {
      flex: 0 0 calc(50% - 10px);
    }
  }
}
</style>
