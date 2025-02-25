<template>
  <v-card
    class="im-category-card d-flex flex-column"
    hover
    :to="{ name: PAGES.items.name, query: { categories: `${category.id},` } }"
    :style="cardStyles"
  >
    <div class="im-category-card__img">
      <v-btn
        :to="{ name: PAGES.categoryUpdate.name, params: { id: category.id } }"
        class="im-category-card__edit-btn"
        color="primary"
        dark
        fab
        small
      >
        <v-icon dark>{{ ICONS.penсil }}</v-icon>
      </v-btn>
      <v-img
        v-if="typeof category.image === 'string'"
        aspect-ratio="1.5"
        :src="category.image | serverImgPath"
      />
      <im-img-stub v-else />
    </div>

    <v-card-title>
      {{ category.name }}
    </v-card-title>

    <v-card-text>
      <p>
        {{ category.description }}
      </p>

      <p class="d-flex align-center">
        <span class="mr-1">Owner:</span>
        <span class="font-weight-black">
          {{ category.user.name || category.user.email }}
        </span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import ImImgStub from '@/components/UI/ImgStub.vue';
import PAGES from '@/assets/js/config/pages/index';
import ICONS from '@/assets/js/config/icons/index';

export default {
  name: 'ImCategoryCard',
  components: {
    ImImgStub,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    PAGES() {
      return PAGES;
    },
    ICONS() {
      return ICONS;
    },
    cardStyles() {
      return {
        borderColor: this.category.color,
      };
    },
  },
};
</script>

<style lang="scss">
.im-category-card {
  height: 100%;
  border-width: 2px;
  border-style: solid;

  &:hover {
    .im-category-card__edit-btn {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__img {
    position: relative;
  }

  &__edit-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s linear;
  }
}
</style>
