<template>
  <v-container class="im-item-create">
    <im-item-form
      :itemProp="item"
      :errorsProp="errors"
      :isLoading="isLoading"
      @save="saveHandler"
      @delete="deleteHandler"
    />
  </v-container>
</template>

<script>
import ImItemForm from '@/components/forms/ItemForm.vue';
import { mapActions } from 'vuex';
import PAGES from '@/assets/js/config/pages/index';
import { converErrorArrToObj } from '@/assets/js/lib/index';

export default {
  name: 'ImItemUpdate',
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
  created() {
    this.itemId = this.$route.params.id;
    this.getItem(this.itemId).then((res) => {
      this.item = res;
    });
  },
  methods: {
    ...mapActions({
      getItem: 'item/getItem',
      updateItem: 'item/updateItem',
      deleteItem: 'item/deleteItem',
    }),
    saveHandler(item) {
      this.isLoading = true;

      this.updateItem({ data: item, id: this.itemId })
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
    deleteHandler() {
      this.isLoading = true;

      this.deleteItem(this.itemId)
        .then(() => {
          this.$router.push({ name: PAGES.items.name });
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
