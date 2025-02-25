<template>
  <div class="im-group">
    <v-container>
      <ul class="im-group-list">
        <li>
          <im-create-card @click="isAddToGroupDialog = true" />
        </li>
        <li>
          <im-user-card :user="user" />
        </li>
        <li v-for="(user, i) in group" :key="i">
          <im-user-card isDelete :user="user" @delete="userDeleteHandler" />
        </li>
      </ul>
    </v-container>

    <v-overlay :value="isOverlay">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>

    <im-add-to-group-dialog
      v-model="isAddToGroupDialog"
      @submit="isAddToGroupDialog = false"
    />

    <im-confirm-dialog
      v-model="isConfirmDialog"
      @submit="confirmDeleteUser"
      @cancel="cancelDeleteUser"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ImCreateCard from '@/components/UI/CreateCard.vue';
import ImUserCard from '@/components/UserCard.vue';
import ImAddToGroupDialog from '@/components/dialogs/AddToGroupDialog.vue';
import ImConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';

export default {
  name: 'ImGroup',
  components: {
    ImUserCard,
    ImCreateCard,
    ImAddToGroupDialog,
    ImConfirmDialog,
  },
  data() {
    return {
      isOverlay: true,
      isAddToGroupDialog: false,
      isConfirmDialog: false,
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('group', ['group']),
  },
  created() {
    this.getGroup().finally(() => {
      this.isOverlay = false;
    });
  },
  methods: {
    ...mapActions({
      getGroup: 'group/getGroup',
      deleteFromGroup: 'group/deleteFromGroup',
    }),
    userDeleteHandler(user) {
      this.userForDeleting = user;
      this.isConfirmDialog = true;
    },
    confirmDeleteUser() {
      if (!this.userForDeleting) return;
      const { id } = this.userForDeleting;
      this.isConfirmDialog = false;

      this.deleteFromGroup({ id }).catch((err) => {
        console.error(err);
      });
    },
    cancelDeleteUser() {
      this.isConfirmDialog = false;
    },
  },
};
</script>

<style lang="scss">
.im-group {
  &-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 20px;
  }
}
</style>
