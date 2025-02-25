<template>
  <v-form
    ref="form"
    v-model="isValid"
    class="im-category-form"
    :disabled="isLoading"
  >
    <v-row>
      <v-col cols="12" md="5" class="im-category-form__l">
        <im-input-img
          v-model="category.image"
          class="mt-n2"
          :errorMessage="errors.image"
          @input="clearError('image')"
        />
      </v-col>

      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12" lg="6" class="im-category-form__c">
            <v-text-field
              v-model="category.name"
              class="mb-4"
              outlined
              label="Type category name"
              hide-details="auto"
              :rules="RULES.required"
              :prepend-icon="ICONS.label"
              :error-messages="errors.name"
              @input="clearError('name')"
            />

            <v-textarea
              v-model="category.description"
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

          <v-col cols="12" lg="6" class="im-category-form__r">
            <v-input
              ref="colorPicker"
              class="im-input mb-4 mt-n2"
              hide-details="auto"
              :prepend-icon="ICONS.colors"
              :error-messages="errors.color"
              @input="clearError('color')"
            >
              <fieldset class="im-input__cont">
                <legend>Color</legend>
                <v-color-picker
                  v-model="category.color"
                  show-swatches
                  swatches-max-height="200px"
                  :key="colorPickSize"
                  :width="colorPickSize"
                />
              </fieldset>
            </v-input>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-5">
          <v-btn
            :key="isEdited + isLoading"
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
            v-if="category.id"
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
import { cloneDeep, isEqual } from 'lodash';
import ImInputImg from '@/components/UI/InputImg.vue';
import ICONS from '@/assets/js/config/icons/index';
import RULES from '@/assets/js/lib/rules';
import {
  getEmptyCategory,
  getEmptyCategoryErrors,
} from '@/assets/js/lib/index';
import ThrottledEvent from '@/assets/js/lib/ThrottledEvent';

export default {
  name: 'ImCategoryForm',
  components: {
    ImInputImg,
  },
  props: {
    categoryProp: {
      type: Object,
      default: getEmptyCategory,
    },
    errorsProp: {
      type: Object,
      default: getEmptyCategoryErrors,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isValid: false,
      category: cloneDeep(this.categoryProp),
      categoryOrigin: cloneDeep(this.categoryProp),
      errors: cloneDeep(this.errorsProp),
      colorPickSize: 0,
    };
  },
  computed: {
    ICONS() {
      return ICONS;
    },
    RULES() {
      return RULES;
    },
    isEdited() {
      return !isEqual(this.categoryOrigin, this.category);
    },
  },
  mounted() {
    console.dir(this.$refs.colorPicker);
    this.colorPickerInner = this.$refs.colorPicker.$el.querySelector(
      '.v-input__slot',
    );
    this.throttledResize = new ThrottledEvent('resize');
    this.throttledResize.add(this.udateColorPickWidth);
  },
  beforeDestroy() {
    this.throttledResize.remove(this.udateColorPickWidth);
    this.throttledResize = null;
  },
  methods: {
    saveHandler() {
      this.$refs.form.validate();
      if (!this.isValid) return;
      this.$emit('save', this.category);
    },
    deleteHandler() {
      this.$emit('delete', this.category);
    },
    clearError(key) {
      if (this.errors[key]) this.errors[key] = '';
    },
    udateColorPickWidth() {
      const paddings = 12 * 2;
      this.colorPickSize = this.colorPickerInner.offsetWidth - paddings;
    },
  },
  watch: {
    categoryProp(val) {
      let category = getEmptyCategory();
      if (val) category = cloneDeep(val);
      this.category = category;
    },
    errorsProp(val) {
      let errors = getEmptyCategoryErrors();
      if (val) errors = cloneDeep(val);
      this.errors = errors;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/general/index.scss';

.im-category-form {
  padding-top: 20px;
  padding-bottom: 20px;

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
