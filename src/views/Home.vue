<template>
  <div>
    <div class="background-card">
      <div class="div-container">
        <UpperBar />
        <Table style="margin-top:2%;" :items="currentTableContent" />
      </div>
    </div>
  </div>
</template>

<script>
import UpperBar from "../components/UpperBar";
import Table from "../components/Table";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { UpperBar, Table },
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
      selectedTab: "radio1",
      tabOptions: [
        { text: "Top Rated", value: "topRated" },
        { text: "Up Coming", value: "upComing" },
        { text: "Popular", value: "popular" },
        { text: "Favourite", value: "favourite" }
      ]
    };
  },
  computed: {
    ...mapState({
      topRated: state => state.movies.topRated,
      upComing: state => state.movies.upComing,
      popular: state => state.movies.popular,
      favourite: state => state.movies.favourite,
      currentTableContent:state => state.movies.currentTableContent,
    })
  }
};
</script>

<style lang='scss' scoped>
.background-card {
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  display: block;
  margin: 3% auto;
  width: 95%;
  min-height: 30rem;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.822);
}
.div-container {
  margin: 0 2%;
  padding-bottom: 2%;
}
</style>