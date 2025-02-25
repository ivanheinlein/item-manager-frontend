<template>
  <div class="im-items">
    <v-btn class="ma-2" fab fixed small color="primary" @click="openAside">
      <v-icon>
        {{ ICONS.dashboard }}
      </v-icon>
    </v-btn>

    <v-navigation-drawer
      class="im-items-aside"
      v-model="isAsideOpened"
      fixed
      left
      disable-route-watcher
    >
      <div class="pa-4">
        <p class="pb-1 d-flex align-center">
          <v-icon color="primary" class="mr-2">
            {{ ICONS.filter }}
          </v-icon>
          <span>Filters</span>

          <v-btn
            class="ml-auto"
            icon
            dense
            large
            color="primary"
            @click="closeAside"
          >
            <v-icon>{{ ICONS.close }}</v-icon>
          </v-btn>
        </p>

        <v-text-field
          class="mb-4"
          v-model="filters.name"
          outlined
          dense
          label="Search by name"
          hide-details
          :append-icon="ICONS.magnify"
        />

        <v-select
          class="mb-4"
          v-model="filters.order"
          label="Order"
          dense
          attach
          outlined
          hide-details
          :items="orders"
        />

        <v-select
          class="mb-4"
          v-model="filters.categories"
          label="Categories"
          multiple
          outlined
          dense
          attach
          hide-details
          :items="selectCategories"
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click="toggleCategorySelect">
              <v-list-item-action>
                <v-icon color="indigo darken-4">
                  {{ getSelectIcon(filters.categories, selectCategories) }}
                </v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Select All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-2"></v-divider>
          </template>

          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span class="grey--text caption" v-if="index === 1">
              (+{{ filters.categories.length - 1 }})
            </span>
          </template>
        </v-select>

        <v-select
          class="mb-4"
          v-model="filters.users"
          label="Users"
          multiple
          outlined
          dense
          attach
          hide-details
          :items="selectUsers"
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click="toggleUsersSelect">
              <v-list-item-action>
                <v-icon :color="'indigo darken-4'">
                  {{ getSelectIcon(filters.users, selectUsers) }}
                </v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Select All</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-2"></v-divider>
          </template>

          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span class="grey--text caption" v-if="index === 1">
              (+{{ filters.users.length - 1 }})
            </span>
          </template>
        </v-select>

        <v-menu
          transition="scale-transition"
          attach
          min-width="auto"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="mb-4"
              v-on="on"
              outlined
              dense
              label="Choose date"
              readonly
              clearable
              hide-details
              :value="dateRangeText"
              :append-icon="ICONS.calendar"
              @click:clear="filters.dates = []"
            />
          </template>
          <v-date-picker v-model="filters.dates" fixed range width="224" />
        </v-menu>

        <v-btn text width="100%" color="primary" @click="clearFilters">
          Clear filters
        </v-btn>
      </div>

      <div class="pa-4">
        <p class="pb-1 d-flex align-center">
          <v-icon color="primary" class="mr-2">
            {{ ICONS.tableEdit }}
          </v-icon>
          <span>Edit card view</span>
        </p>

        <ul class="pl-0 im-items-card-options">
          <li v-for="(view, key) in cardView" :key="key">
            <v-switch v-model="view.value" hide-details :label="view.label" />
          </li>
        </ul>
      </div>
    </v-navigation-drawer>

    <v-container>
      <ul class="im-items-list pl-0">
        <li>
          <im-create-card :to="{ name: PAGES.itemCreate.name }" />
        </li>
        <li v-for="item in items" :key="item.id">
          <im-item-card :item="item" :cardViewOpt="cardViewOpt" />
        </li>
        <li v-if="isItemsLoading" class="im-items-list-loader">
          <v-progress-circular color="primary" indeterminate size="50" />
        </li>
      </ul>
    </v-container>

    <v-overlay :value="isOverlay">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { cloneDeep, merge, throttle } from 'lodash';
import ImCreateCard from '@/components/UI/CreateCard.vue';
import ImItemCard from '@/components/ItemCard.vue';
import ICONS from '@/assets/js/config/icons/index';
import PAGES from '@/assets/js/config/pages/index';
import { getSringifyQuery, parseQuery } from '@/assets/js/lib/query';

const DEF_QUERY = {
  order: 'DESC',
  users: [],
  categories: [],
  dates: [],
  name: '',
};

export default {
  name: 'ImItems',
  components: {
    ImCreateCard,
    ImItemCard,
  },
  data() {
    return {
      orders: [
        {
          value: 'DESC',
          text: 'New first',
        },
        {
          value: 'ASC',
          text: 'Old first',
        },
      ],
      cardView: {
        img: {
          value: true,
          label: 'Image',
        },
        categories: {
          value: true,
          label: 'Categories',
        },
        owner: {
          value: true,
          label: 'Owner',
        },
        date: {
          value: true,
          label: 'Created',
        },
        description: {
          value: true,
          label: 'Description',
        },
      },
      filters: cloneDeep(DEF_QUERY),
      isOverlay: false,
      isAsideOpened: false,
      isItemsLoading: false,
      page: 1,
      perPage: 30,
    };
  },
  computed: {
    ...mapState('item', ['items', 'total']),
    ...mapState('category', ['categories']),
    ...mapState('group', ['group']),
    ...mapState('user', ['user']),
    dateRangeText() {
      return this.filters.dates.join(' / ');
    },
    selectCategories() {
      return this.categories.map(({ id, name }) => ({
        value: id.toString(),
        text: name,
      }));
    },
    selectUsers() {
      const users = [this.user, ...this.group];
      return users.map(({ id, name, email }) => ({
        value: id.toString(),
        text: name || email,
      }));
    },
    cardViewOpt() {
      return Object.fromEntries(
        Object.entries(this.cardView).map(([key, val]) => [key, val.value]),
      );
    },
    ICONS() {
      return ICONS;
    },
    PAGES() {
      return PAGES;
    },
  },
  watch: {
    filters: {
      deep: true,
      handler(val) {
        this.isOverlay = true;
        this.$router.replace({ query: getSringifyQuery(val, DEF_QUERY) });
        this.page = 1;
        const query = {
          ...val,
          page: this.page,
          perPage: this.perPage,
        };

        this.getItems(query).then(() => {
          this.isOverlay = false;
        });
      },
    },
  },
  created() {
    this.isOverlay = true;
    const query = parseQuery(this.$route.query);
    merge(this.filters, query);

    Promise.all([
      this.getCategories(),
      this.getGroup(),
      this.getItems({
        ...this.filters,
        page: this.page,
        perPage: this.perPage,
      }),
    ])
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.isOverlay = false;
      });
  },
  mounted() {
    this.scrollElem = document.querySelector('.im-dashboard-main');
    this.throttleScrollHandler = throttle(this.scrollHandler, 200);
    this.scrollElem.addEventListener('scroll', this.throttleScrollHandler);
  },
  beforeDestroy() {
    this.scrollElem.removeEventListener('scroll', this.throttleScrollHandler);
    this.throttleScrollHandler = null;
    this.scrollElem = null;
  },
  methods: {
    ...mapActions({
      getItems: 'item/getItems',
      getCategories: 'category/getCategories',
      getGroup: 'group/getGroup',
    }),
    getSelectIcon(curArr, originArr) {
      if (curArr.length === originArr.length) return ICONS.closeBox;
      if (curArr.length > 0) return ICONS.minusBox;
      return ICONS.checkboxBlankOutline;
    },
    toggleCategorySelect() {
      if (this.filters.categories.length > 0) {
        this.filters.categories = [];
      } else {
        this.filters.categories = this.categories.map(({ id }) => id.toString());
      }
    },
    toggleUsersSelect() {
      if (this.filters.users.length > 0) {
        this.filters.users = [];
      } else {
        this.filters.users = this.selectUsers.map(({ value }) => value.toString());
      }
    },
    openAside() {
      this.isAsideOpened = true;
    },
    closeAside() {
      this.isAsideOpened = false;
    },
    clearFilters() {
      this.filters = cloneDeep(DEF_QUERY);
    },
    scrollHandler(e) {
      const { target } = e;
      const SCROLL_OFFSET = 200;
      if (this.page * this.perPage >= this.total || this.isItemsLoading) return;

      const leftToScroll = target.scrollHeight - target.scrollTop - window.innerHeight;
      if (leftToScroll > SCROLL_OFFSET) return;

      this.isItemsLoading = true;
      this.page += 1;
      const query = {
        ...this.filters,
        page: this.page,
        perPage: this.perPage,
      };
      this.getItems(query)
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.isItemsLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.im-items {
  padding-bottom: 40px;

  &-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;

    &-loader {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-card-options {
    list-style: none;
  }
}
</style>
