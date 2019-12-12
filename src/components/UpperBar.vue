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
      <b-col cols="4">
        <b-form-radio-group
          class="mt-4 shade"
          style="float:right;"
          v-model="selectedTab"
          :options="tabOptions"
          buttons
          size="sm"
        ></b-form-radio-group>
      </b-col>
      <b-col cols="3">
        <b-input-group size="sm" class="mt-4 shade">
          <b-form-input v-model="filterSearch" placeholder="Search for movies"></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filterSearch" @click="filterSearch = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-dropdown
          @click="addFavs()"
          size="sm"
          style="float:right;"
          split
          text="Add to my favourite"
          class="mt-4 shade"
        >
          <b-dropdown-item size="sm" @click="cleanFavs()">Clean Favourites</b-dropdown-item>
        </b-dropdown>
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
      filterSearch: null,
      selectedCategory: null,
      categoryOptions: [
        { value: null, text: "select a category  (all)" },
        { value: 10749, text: "Romance" },
        { value: 28, text: "Action" },
        { value: 35, text: "Comedy" },
        { value: 18, text: "Drama" },
        { value: 12, text: "Adventure" },
        { value: 16, text: "Animation" }
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
      loadToprated: "loadToprated",
      loadUpcoming: "loadUpcoming",
      loadPopular: "loadPopular",
      loadFavourite: "loadFavourite",
      loadCurrentTableContent: "loadCurrentTableContent"
    }),
    addFavs() {
      this.$eventHub.$emit("addFavs");
    },
    cleanFavs() {
      window.localStorage.favourite = "[]";
      this.loadCurrentTableContent(this.selectedTab);
      this.$bvToast.toast("Favourite list was cleaned", {
        title: `Notification`,
        variant: "success",
        solid: true
      });
    }
  },
  watch: {
    selectedTab() {
      let loader = this.$loading.show();
      switch (this.selectedTab) {
        case "topRated":
          this.loadCurrentTableContent(this.selectedTab);
          break;

        case "upComing":
          this.loadCurrentTableContent(this.selectedTab);
          break;

        case "popular":
          this.loadCurrentTableContent(this.selectedTab);
          break;

        case "favourite":
          this.loadCurrentTableContent(this.selectedTab);
          break;
      }
      loader.hide();
    },
    selectedCategory($val) {
      this.$eventHub.$emit("filterGenre", $val);
    },
    filterSearch($val) {
      if ($val != null) {
        this.$eventHub.$emit("filterSearch", $val);
      }
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