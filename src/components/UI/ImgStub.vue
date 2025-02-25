<template>
  <v-img class="grey lighten-5 im-item-stub" aspect-ratio="1.5" :src="src" />
</template>

<script>
const AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 350'%3E%3Cpath d='M175 171.173c38.914 0 70.463-38.318 70.463-85.586C245.463 38.318 235.105 0 175 0s-70.465 38.318-70.465 85.587c0 47.268 31.549 85.586 70.465 85.586zM41.909 301.853c-.012-2.882-.024-.812 0 0zm266.176 2.251c.038-.789.013-5.474 0 0z' fill='%23A5A5A5'/%3E%3Cpath xmlns='http://www.w3.org/2000/svg' d='M307.935 298.397c-1.305-82.342-12.059-105.805-94.352-120.657 0 0-11.584 14.761-38.584 14.761s-38.586-14.761-38.586-14.761C55.018 192.43 43.61 215.545 42.11 295.722c-.123 6.547-.18 6.891-.202 6.131.005 1.424.011 4.058.011 8.651 0 0 19.592 39.496 133.08 39.496 113.486 0 133.08-39.496 133.08-39.496 0-2.951.002-5.003.005-6.399-.022.47-.066-.441-.149-5.708z' fill='%23A5A5A5'/%3E%3C/svg%3E";
const COMMON = 'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%20282.69%20228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20fill%3D%22%23A5A5A5%22%20cx%3D%22115.3%22%20cy%3D%2235.75%22%20r%3D%2235.75%22%2F%3E%3Cpath%20fill%3D%22%23A5A5A5%22%20d%3D%22M188.7%2C228h-81.34c-10.27%2C0-16.24-11.86-10.28-20.41l38.69-55.48l42.65-61.2%20c5.03-7.22%2C15.53-7.22%2C20.56%2C0l42.64%2C61.17l38.7%2C55.51c5.96%2C8.55-0.02%2C20.4-10.28%2C20.4H188.7z%22%2F%3E%3Cpath%20fill%3D%22%23A5A5A5%22%20d%3D%22M2.48%2C206.79l55.44-78.81c4.27-6.07%2C12.64-7.54%2C18.72-3.29l112.83%2C78.81%20c10.8%2C7.54%2C5.46%2C24.51-7.71%2C24.51l-168.27%2C0C2.58%2C228-3.8%2C215.71%2C2.48%2C206.79z%22%2F%3E%3C%2Fsvg%3E';

export default {
  name: 'ImImgStub',
  props: {
    avatar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    src() {
      if (this.avatar) return AVATAR;
      return COMMON;
    },
  },
};
</script>

<style lang="scss">
.im-item-stub {
  .v-image__image {
    background-size: 50% 50%;
  }
}
</style>
