<template>
  <v-input
    class="im-input im-input-file"
    hide-details="auto"
    :prepend-icon="ICONS.camera"
    :error-messages="errorMessage"
  >
    <fieldset class="im-input__cont" v-ripple>
      <legend>Image</legend>
      <label class="im-input-file__cont">
        <input
          type="file"
          accept="image/*"
          class="im-input-file__input"
          @input="fileLoadHandler"
        />
        <v-img
          class="grey lighten-5"
          v-if="image"
          aspect-ratio="1.5"
          :src="outputImg"
        />
        <im-img-stub v-else :avatar="avatar" />
      </label>

      <v-btn
        class="im-input-file__del-btn"
        v-if="image"
        fab
        small
        color="error"
        @click="clearImage"
      >
        <v-icon>{{ ICONS.close }}</v-icon>
      </v-btn>
    </fieldset>
  </v-input>
</template>

<script>
import ICONS from '@/assets/js/config/icons/index';
import ImImgStub from '@/components/UI/ImgStub.vue';
import { getImgFromFile } from '@/assets/js/lib/file';

export default {
  name: 'ImInputImg',
  components: {
    ImImgStub,
  },
  props: {
    value: {
      type: [File, String],
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      image: this.value,
    };
  },
  methods: {
    fileLoadHandler(e) {
      [this.image] = e.target.files;
    },
    clearImage() {
      this.image = null;
    },
  },
  computed: {
    outputImg() {
      if (typeof this.image === 'string') {
        return this.$options.filters.serverImgPath(this.image);
      }

      if (this.image instanceof File) {
        return getImgFromFile(this.image);
      }

      return '';
    },
    ICONS() {
      return ICONS;
    },
  },
  watch: {
    value(val) {
      this.image = val;
    },
    image(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="scss">
.im-input-file {
  &__cont {
    display: block;
    width: 100%;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__del-btn {
    position: absolute;
    top: -5px;
    right: -10px;
  }
}
</style>
