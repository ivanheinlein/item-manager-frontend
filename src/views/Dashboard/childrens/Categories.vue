<template>
  <div class="im-categories">
    <v-container>
      <ul class="im-categories-list pl-0">
        <li>
          <im-create-card
            :to="{ name: PAGES.categoryCreate.name }"
          />
        </li>
        <li
          v-for="category in categories"
          :key="category.id"
        >
          <im-category-card
            :category="category"
          />
        </li>
      </ul>
    </v-container>

    <v-overlay :value="isOverlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ImCreateCard from '@/components/UI/CreateCard.vue';
import ImCategoryCard from '@/components/CategoryCard.vue';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImCategories',
  components: {
    ImCreateCard,
    ImCategoryCard,
  },
  data() {
    return {
      isOverlay: false,
    };
  },
  created() {
    this.isOverlay = true;
    this.getCategories()
      .then(() => { this.isOverlay = false; });
  },
  methods: {
    ...mapActions({
      getCategories: 'category/getCategories',
    }),
  },
  computed: {
    ...mapState('category', ['categories']),
    PAGES() {
      return PAGES;
    },
  },
};
</script>

<style lang="scss">
.im-categories {
  &-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 20px;
  }
}
</style>
