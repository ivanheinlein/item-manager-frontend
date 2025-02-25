<template>
  <v-card
    class="im-card d-flex flex-column"
    hover
    :to="{ name: PAGES.itemUpdate.name, params: { id: item.id } }"
  >
    <div v-if="cardViewOpt.img">
      <v-img
        v-if="typeof item.image === 'string'"
        aspect-ratio="1.5"
        contain
        :src="item.image | serverImgPath"
      />
      <im-img-stub v-else />
    </div>

    <v-card-title :class="'title'">{{ item.name }}</v-card-title>

    <v-card-subtitle v-if="cardViewOpt.categories">
      <v-chip-group column>
        <v-chip
          class="im-card-chip"
          v-for="category in item.categories"
          disabled
          :key="category.id"
          :color="category.color"
        >
          {{ category.name }}
        </v-chip>
      </v-chip-group>
    </v-card-subtitle>

    <v-card-text v-if="cardViewOpt.description">
      {{ item.description }}
    </v-card-text>

    <v-divider
      class="mx-4 mb-2 mt-auto"
      v-if="cardViewOpt.owner || cardViewOpt.date"
    >
    </v-divider>

    <v-card-text
      class="body-2 d-flex justify-space-between"
      v-if="cardViewOpt.owner || cardViewOpt.date"
    >
      <span v-if="cardViewOpt.owner && item.user" class="mr-2">
        <span class="mr-1">Owner:</span>
        <span class="font-weight-black">
          {{ item.user.name || item.user.email }}
        </span>
      </span>
      <span v-if="cardViewOpt.date">
        <span class="mr-1">Created:</span>
        <span class="font-weight-black">{{ item.createdAt | parseDate }}</span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import ImImgStub from '@/components/UI/ImgStub.vue';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImItemCard',
  components: {
    ImImgStub,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    cardViewOpt: {
      type: Object,
      default: () => ({
        img: true,
        categories: true,
        owner: true,
        date: true,
        description: true,
      }),
    },
  },
  data() {
    return {};
  },
  computed: {
    PAGES() {
      return PAGES;
    },
  },
};
</script>

<style lang="scss">
.im-card {
  height: 100%;

  &-chip {
    opacity: 1 !important;
  }
}
</style>
