<template>
  <v-container class="im-category-update">
    <im-category-form
      :categoryProp="category"
      :errorsProp="errors"
      :isLoading="isLoading"
      @save="saveHandler"
      @delete="deleteHandler"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import ImCategoryForm from '@/components/forms/CategoryForm.vue';
import {
  converErrorArrToObj,
  getEmptyCategory,
  getEmptyCategoryErrors,
} from '@/assets/js/lib/index';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImCategoryUpdate',
  components: {
    ImCategoryForm,
  },
  data() {
    return {
      category: getEmptyCategory(),
      errors: getEmptyCategoryErrors(),
      isLoading: false,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.isLoading = true;

    this.getCategory(id)
      .then((res) => {
        this.category = res;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions({
      getCategory: 'category/getCategory',
      updateCategory: 'category/updateCategory',
      deleteCategory: 'category/deleteCategory',
    }),
    saveHandler(category) {
      this.isLoading = true;

      this.updateCategory({ id: category.id, data: category })
        .then(() => {
          this.$router.push({ name: PAGES.categories.name });
        })
        .catch((err) => {
          this.errors = { ...this.errors, ...converErrorArrToObj(err.errors) };
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteHandler(category) {
      this.isLoading = true;

      this.deleteCategory(category.id)
        .then(() => {
          this.$router.push({ name: PAGES.categories.name });
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
