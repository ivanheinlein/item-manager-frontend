<template>
  <v-container class="im-category-create">
    <im-category-form
      :categoryProp="category"
      :errorsProp="errors"
      :isLoading="isLoading"
      @save="saveHandler"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import ImCategoryForm from '@/components/forms/CategoryForm.vue';
import PAGES from '@/assets/js/config/pages/index';
import {
  getEmptyCategory,
  getEmptyCategoryErrors,
} from '@/assets/js/lib/dto';
import { converErrorArrToObj } from '@/assets/js/lib/error';

export default {
  name: 'ImCategoryCreate',
  components: {
    ImCategoryForm,
  },
  data() {
    return {
      category: getEmptyCategory(),
      isLoading: false,
      errors: getEmptyCategoryErrors(),
    };
  },
  methods: {
    ...mapActions({
      createCategory: 'category/createCategory',
    }),
    saveHandler(category) {
      this.isLoading = true;

      this.createCategory(category)
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
  },
};
</script>

<style lang="scss">
</style>
