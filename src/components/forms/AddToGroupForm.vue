<template>
  <v-form ref="form" class="im-add-to-group-form" :disabled="isLoading">
    <h3 class="pb-4">Add your friend</h3>

    <v-autocomplete
      v-model="friend"
      class="mb-4"
      outlined
      dense
      hide-details="auto"
      label="Type email"
      no-filter
      return-object
      clearable
      :rules="RULES.required"
      :items="items"
      @keyup="throttledSearch"
    />

    <v-btn
      color="success"
      large
      width="100%"
      :disabled="isLoading"
      :loading="isLoading"
      @click="saveHandler"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { throttle } from 'lodash';
import RULES from '@/assets/js/lib/rules';
import { axiosFindUser } from '@//assets/js/api/group';

export default {
  name: 'ImAddToGroupForm',
  data() {
    return {
      friend: null,
      items: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('group', ['group']),
    RULES() {
      return RULES;
    },
  },
  created() {
    this.throttledSearch = throttle(this.searchHandler, 500);
    this.getGroup();
  },
  methods: {
    ...mapActions({
      getGroup: 'group/getGroup',
      addToGroup: 'group/addToGroup',
    }),
    adaptUsersToAutocomplit(users) {
      const friends = [this.user.id, ...this.group.map(({ id }) => id)];

      return users
        .filter((user) => !friends.includes(user.id))
        .map(({ email, id }) => ({
          text: email,
          value: id,
        }));
    },
    searchHandler(e) {
      const { value } = e.target;
      if (this.prevSearchValue === value) return;
      this.prevSearchValue = value;

      axiosFindUser({ email: value })
        .then((res) => {
          const { users } = res.data.data;
          this.items = this.adaptUsersToAutocomplit(users);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    saveHandler() {
      if (!this.$refs.form.validate()) return;
      this.isLoading = true;

      this.addToGroup({ id: this.friend.value })
        .then(() => {
          this.$emit('submit', this.friend);
          this.friend = null;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.im-add-to-group-form {
}
</style>
