<template>
  <v-form
    ref="form"
    v-model="isValid"
    class="im-item-form"
    :disabled="isLoading"
  >
    <v-row>
      <v-col cols="12" md="5" class="im-item-form__l">
        <im-input-img
          v-model="item.image"
          class="mt-n2"
          :errorMessage="errors.image"
          @input="clearError('image')"
        />
      </v-col>

      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12" lg="6" class="im-item-form__c">
            <v-text-field
              v-model="item.name"
              class="mb-4"
              outlined
              label="Type item name"
              hide-details="auto"
              :rules="RULES.required"
              :prepend-icon="ICONS.label"
              :error-messages="errors.name"
              @input="clearError('name')"
            />

            <v-textarea
              v-model="item.description"
              class="mb-4"
              outlined
              label="Description"
              hide-details="auto"
              auto-grow
              :prepend-icon="ICONS.messageText"
              :error-messages="errors.description"
              @input="clearError('description')"
            />
          </v-col>

          <v-col cols="12" lg="6" class="im-item-form__r">
            <v-input
              class="im-input im-item-form-categories mb-4 mt-n2"
              hide-details="auto"
              :error-messages="errors.categories"
              :prepend-icon="ICONS.bookmark"
            >
              <fieldset class="im-input__cont">
                <legend>Categories</legend>
                <v-chip-group v-model="item.categories" column multiple>
                  <v-chip
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    :color="
                      item.categories.includes(category.id)
                        ? category.color
                        : null
                    "
                  >
                    {{ category.name }}
                  </v-chip>
                </v-chip-group>
              </fieldset>
            </v-input>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-5">
          <v-btn
            class="mr-4"
            color="success"
            large
            :loading="isLoading"
            :disabled="isLoading || !isEdited"
            @click="saveHandler"
          >
            Save
          </v-btn>
          <v-btn
            v-if="item.id"
            color="error"
            large
            :loading="isLoading"
            :disabled="isLoading"
            @click="deleteHandler"
          >
            Delete
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { merge, isEqual } from 'lodash';
import ImInputImg from '@/components/UI/InputImg.vue';
import { getEmptyItem, getEmptyItemErrors } from '@/assets/js/lib/index';
import ICONS from '@/assets/js/config/icons/index';
import RULES from '@/assets/js/lib/rules';

export default {
  name: 'ImItemForm',
  components: {
    ImInputImg,
  },
  props: {
    itemProp: {
      type: Object,
      default: () => ({}),
    },
    errorsProp: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isValid: false,
      item: this.getParsedItem(this.itemProp),
      itemOrigin: this.getParsedItem(this.itemProp),
      errors: merge(getEmptyItemErrors(), this.errorsProp),
    };
  },
  created() {
    this.getCategories();
  },
  computed: {
    ...mapState('category', ['categories']),
    ICONS() {
      return ICONS;
    },
    RULES() {
      return RULES;
    },
    isEdited() {
      return !isEqual(this.itemOrigin, this.item);
    },
  },
  watch: {
    itemProp(val) {
      this.item = this.getParsedItem(val);
      this.itemOrigin = this.getParsedItem(this.itemProp);
    },
    errorsProp(val) {
      this.errors = merge(getEmptyItemErrors(), val);
    },
  },
  methods: {
    ...mapActions({
      getCategories: 'category/getCategories',
    }),
    clearError(key) {
      if (this.errors[key]) this.errors[key] = '';
    },
    saveHandler() {
      if (!this.$refs.form.validate()) return;
      this.$emit('save', this.item);
    },
    deleteHandler() {
      this.$emit('delete', this.item);
    },
    getParsedItem(item) {
      const {
        id,
        name,
        description,
        image,
        categories,
      } = merge(
        getEmptyItem(),
        item,
      );

      return {
        id,
        name,
        description,
        image,
        categories: categories.map(({ id: catId }) => parseInt(catId, 10)),
      };
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-item-form {
  padding-top: 20px;
  padding-bottom: 20px;

  &-categories {
    .im-input__cont {
      min-height: 62px;
    }
  }

  &__l {
  }

  &__c {
    @include media('<=1263px') {
      padding-bottom: 0 !important;
    }
  }

  &__r {
    @include media('<=1263px') {
      padding-top: 0 !important;
    }
  }
}
</style>
