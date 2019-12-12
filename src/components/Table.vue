<template>
  <div>
    <div class="table-container shade">
      <b-table
        small
        stacked="md"
        :items="filterByGenre(items)"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filterSearch"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(title)="row">
          <div @click="row.toggleDetails">
            <b-checkbox v-model="favsSelected" :value="row.item" style="display:inline;"></b-checkbox>
            <div style="display:inline;">{{ row.value}}</div>
          </div>
        </template>

        <template v-slot:cell(release_date)="row">
          <div @click="row.toggleDetails">{{ row.value}}</div>
        </template>

        <template v-slot:cell(overview)="row">
          <div
            @click="row.toggleDetails"
            class="cut-text"
            style="font-size:12px;"
          >{{ row.value}}</div>
        </template>

        <template v-slot:cell(time)="row">
          <div @click="row.toggleDetails">not available</div>
        </template>

        <template v-slot:cell(vote_average)="row">
          <div @click="row.toggleDetails">{{row.value}}</div>
        </template>

        <template v-slot:cell(vote_count)="row">
          <div @click="row.toggleDetails">{{ row.value}}</div>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row>
              <b-col cols="6">
                <div>
                  <b-row>
                    <b-col cols="6">
                      <carousel-3d width="180" height="135">
                        <slide
                          v-for="(n,index) in 10"
                          :key="index"
                          class="carous"
                          :index="index"
                          v-bind:style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w200/${row.item.backdrops[index].file_path})` }"
                        ></slide>
                      </carousel-3d>
                    </b-col>
                    <b-col cols="6">
                      <center>{{row.item.title}}</center>
                      <center style="font-size:11px;">{{row.item.overview}}</center>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col cols="6">
                <b-card no-body>
                  <b-tabs card>
                    <b-tab
                      v-for="(n,index) in 5"
                      :key="index"
                      :title="`${row.item.cast[index].name}`"
                    >
                      <b-card-text>
                        <b-row>
                          <b-col cols="3">
                            <img
                              :src="`https://image.tmdb.org/t/p/w200/${row.item.cast[index].profile_path}`"
                              height="100"
                              width="auto"
                              style="margin-left:15px;"
                            />
                            <star-rating
                              :star-size="20"
                              :rating="3.8"
                              :read-only="true"
                              :increment="0.01"
                              :show-rating="false"
                            ></star-rating>
                          </b-col>
                          <b-col cols="9">
                            <p
                              :id="`bio-${row.item.cast[index].id}`"
                            >{{getBio(row.item.cast[index].id)}}</p>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <center
        v-if="items == undefined || !items.length"
        style="margin: 10%; 0; color:gray;font-size:12px;"
      >Select a tab or add to your favourites...</center>
      <br />
    </div>
    <b-row v-if="items != undefined && items.length>0">
      <b-col class="my-4">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
          align="left"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col class="my-4">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0 shade"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import StarRating from "vue-star-rating";
import Vue from "vue";
import { mapState, mapActions } from "vuex";
Vue.component("star-rating", StarRating);
import axios from "axios";
let apiURL = "https://api.themoviedb.org/3";
let apiKey = "96e7d4223b658d3d50bfe77083eaa6d0";
export default {
  name: "Table",
  props: ["items"],
  components: { Carousel3d, Slide, StarRating },
  data() {
    return {
      favsSelected: [],
      filterGenre: null,
      fields: [
        {
          key: "title",
          label: "Movie Title",
          sortable: true
        },
        {
          key: "release_date",
          label: "Date",
          sortable: true,
          class: "text-center",
          sortDirection: "desc"
        },
        {
          key: "overview",
          label: "Short Description",
          class: "text-center"
        },
        {
          key: "time",
          label: "Time",
          sortable: true,
          class: "text-center"
        },
        {
          key: "vote_average",
          label: "IMDB Average",
          sortable: true,
          class: "text-center"
        },
        {
          key: "vote_count",
          label: "Votes",
          sortable: true,
          class: "text-center"
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filterSearch: null,
      filterOn: [],
    };
  },
  computed: {
    ...mapState({
      favourite: state => state.movies.favourite
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    ...mapActions({
      updateFavourite: "updateFavourite"
    }),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getBio(id) {
      axios.get(`${apiURL}/person/${id}?api_key=${apiKey}`).then(response => {
        document.getElementById(`bio-${id}`).innerHTML =
          response.data.biography == ""
            ? "No bio available"
            : response.data.biography;
      });
    },
    makeToast() {
      this.$bvToast.toast(this.favsSelected.length>0?"Favourite list was updated":"No movies were selected!", {
        title: `Notification`,
        variant: this.favsSelected.length>0?"success":"danger",
        solid: true
      });
       window.localStorage.favourite = JSON.stringify(this.favsSelected)
    },
    filterByGenre(movies){
      if(movies!= undefined && movies.length >0 && this.filterGenre != null){
        return movies.filter( movie =>  movie.genre_ids.includes(Number(this.filterGenre)) );
      }
      return movies
    }
  },
  watch: {
    items() {
      this.totalRows = this.items.length;
    }
  },
  created() {

    this.$eventHub.$on("addFavs",() => {
      this.makeToast()
    });
    this.$eventHub.$on("filterSearch", (filterSearch) => {
      this.filterSearch = filterSearch
    });
    this.$eventHub.$on("filterGenre", (filterGenre) => {
      this.filterGenre = filterGenre
    });
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  background-color: white !important;
  border-radius: 5px;
  padding: 0 7px;
}
.col-form-label {
  float: left !important;
}
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.carous {
  background-repeat: no-repeat;
  background-size: auto 135px;
  background-position: center;
  background-color: transparent !important;
  border: unset;
}
</style>