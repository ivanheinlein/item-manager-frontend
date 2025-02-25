import { mapState, mapMutations } from 'vuex';

const toggleNav = {
  methods: {
    ...mapMutations([
      'TOGGLE_NAV',
    ]),
    toggleNav() {
      this.isNavOpened = !this.isNavOpened;
    },
  },
  computed: {
    ...mapState({
      isNavOpenedFromStore: 'isNavOpened',
    }),
    isNavOpened: {
      get() {
        return this.isNavOpenedFromStore;
      },
      set(val) {
        this.$store.commit('TOGGLE_NAV', val);
      },
    },
  },
};

export default toggleNav;
