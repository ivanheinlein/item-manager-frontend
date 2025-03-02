<template>
  <v-container class="im-item-create">
    <im-item-form
      :itemProp="item"
      :errorsProp="errors"
      :isLoading="isLoading"
      @save="saveHandler"
    />
  </v-container>
</template>

<script>
import ImItemForm from '@/components/forms/ItemForm.vue';
import { mapActions } from 'vuex';
import PAGES from '@/assets/js/config/pages/index';
import { converErrorArrToObj } from '@/assets/js/lib/error';

export default {
  name: 'ImItemCreate',
  components: {
    ImItemForm,
  },
  data() {
    return {
      item: {},
      errors: {},
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      createItem: 'item/createItem',
    }),
    saveHandler(item) {
      this.isLoading = true;

      this.createItem(item)
        .then(() => {
          this.$router.push({ name: PAGES.items.name });
        })
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
</style>
