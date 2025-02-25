export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteMessage() {
      this.$emit('delete', this.message);
    },
  },
};
