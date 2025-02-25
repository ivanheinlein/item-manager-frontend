export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpened: this.value,
    };
  },
  watch: {
    value(val) {
      if (val === this.isOpened) return;
      this.isOpened = val;
    },
    isOpened(val) {
      this.$emit('input', val);
    },
  },
};
