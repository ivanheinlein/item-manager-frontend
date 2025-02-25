<template>
  <v-card
    class="im-user-card d-flex flex-column"
    hover
    :style="cardStyles"
    :to="{ name: PAGES.items.name, query: { users: `${user.id},` } }"
  >
    <div class="im-user-card__img">
      <v-btn
        v-if="isDelete"
        class="im-user-card__delete-btn"
        icon
        color="error"
        @click.prevent="$emit('delete', user)"
      >
        <v-icon>{{ ICONS.delete }}</v-icon>
      </v-btn>
      <v-img
        v-if="typeof user.avatar === 'string'"
        aspect-ratio="1.5"
        :src="user.avatar | serverImgPath"
      />
      <im-img-stub v-else />
    </div>

    <v-card-title v-if="user.name || user.lastName">
      {{ user.name }} {{ user.lastName }}
    </v-card-title>

    <v-card-subtitle>
      {{ user.email }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import ImImgStub from '@/components/UI/ImgStub.vue';
import ICONS from '@/assets/js/config/icons/index';
import PAGES from '@/assets/js/config/pages/index';

export default {
  name: 'ImUserCard',
  components: {
    ImImgStub,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ICONS() {
      return ICONS;
    },
    PAGES() {
      return PAGES;
    },
    cardStyles() {
      return {
        borderColor: this.user.color,
        backgroundColor: this.user.color,
      };
    },
  },
};
</script>

<style lang="scss">
.im-user-card {
  height: 100%;
  border-width: 2px;
  border-style: solid;

  &:hover {
    .im-user-card__delete-btn {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__img {
    position: relative;
  }

  &__delete-btn {
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
