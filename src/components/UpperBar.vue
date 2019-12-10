<template>
  <div>
    <b-row>
      <b-col cols="2">
        <b-form-select
          v-model="selectedCategory"
          :options="categoryOptions"
          size="sm"
          shadow
          class="shade mt-4"
        ></b-form-select>
      </b-col>
      <b-col cols="5">
        <b-form-radio-group
          class="mt-4 shade"
          style="float:right;"
          v-model="selectedTab"
          :options="tabOptions"
          buttons
          size="sm"
        ></b-form-radio-group>
      </b-col>
      <b-col cols="2">
        <b-form-input size="sm" placeholder="search" class="mt-4 shade"></b-form-input>
      </b-col>
      <b-col cols="3">
        <b-button size="sm" class="mt-4 shade" style="float:right;">Add to my favourite</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UpperBar",
  data() {
    return {
      selectedCategory: null,
      categoryOptions: [
        { value: null, text: "select a category" },
        { value: "romance", text: "Romance" },
        { value: "action", text: "Action" },
        { value: "comedy", text: "Comedy" },
        { value: "drama", text: "Drama" }
      ],
      selectedTab: undefined,
      tabOptions: [
        { text: "Top Rated", value: "topRated" },
        { text: "Up Coming", value: "upComing" },
        { text: "Popular", value: "popular" },
        { text: "Favourite", value: "favourite" }
      ]
    };
  },
  methods: {
    ...mapActions({
      loadCurrentTableContent: "loadCurrentTableContent"
    })
  },
  watch: {
    selectedTab() {
      this.loadCurrentTableContent(this.selectedTab);
    }
  }
};
</script>

<style lang="scss" scoped>
.shade {
  -webkit-box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.89);
  -moz-box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.89);
  box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.89);
}
</style>