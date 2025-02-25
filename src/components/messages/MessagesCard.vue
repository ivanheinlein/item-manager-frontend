<template>
  <v-menu
    v-if="messages.length > 0"
    class="im-messages"
    attach
    min-width="auto"
    left
    top
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="im-messages-btn"
        fab
        fixed
        small
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ ICONS.message }}
        </v-icon>
      </v-btn>
    </template>

    <v-card class="im-messages-card" max-width="300px" height="300px">
      <ul class="im-messages-list">
        <li v-for="message in messages" :key="message.id">
          <im-message
            v-if="message.type === MESSAGE_TYPES.info"
            :message="message"
            @delete="deleteMessageHandler"
          />

          <im-message-confrim-group
            v-if="message.type === MESSAGE_TYPES.groupConfirm"
            :message="message"
            @delete="deleteMessageHandler"
            @confirmGroup="confirmGroupHandler"
          />
        </li>
      </ul>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ICONS from '@/assets/js/config/icons/index';

export default {
  name: 'ImMessagesCard',
  components: {
    ImMessage: () => import('./Message.vue'),
    ImMessageConfrimGroup: () => import('./MessageConfirmGroup.vue'),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('message', ['messages']),
    ICONS() {
      return ICONS;
    },
    MESSAGE_TYPES() {
      return {
        info: 'info',
        groupConfirm: 'groupConfirm',
      };
    },
  },
  created() {
    this.getMessages();
  },
  methods: {
    ...mapActions({
      getMessages: 'message/getMessages',
      deleteMessage: 'message/deleteMessage',
      confirmAddToGroup: 'group/confirmAddToGroup',
    }),
    deleteMessageHandler(message) {
      this.deleteMessage(message.id);
    },
    confirmGroupHandler(message) {
      this.confirmAddToGroup({ messageId: message.id });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-messages {
  &-btn {
    @include media('>tiny') {
      bottom: 20px;
      right: 20px;
    }

    @include media('<=tiny') {
      bottom: 10px;
      right: 10px;
    }
  }

  &-card {
    overflow: hidden;
    display: flex !important;
  }

  &-list {
    overflow-y: auto;

    & > li {
      &:not(:last-of-type) {
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
