<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  created() {
    this.loadToprated();
    this.loadUpcoming();
    this.loadPopular();
    this.loadFavourite();
  },
  methods: {
    ...mapActions({
      loadToprated: "loadToprated",
      loadUpcoming: "loadUpcoming",
      loadPopular: "loadPopular",
      loadFavourite: "loadFavourite"
    })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-image: url("../public/movies-walpaper.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black !important;
}
.shade {
  -webkit-box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 15px -4px rgba(0, 0, 0, 0.5);
}
</style>
