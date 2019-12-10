<template>
  <div>
    <div class="table-container shade">
      <b-table
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(title)="row">
          <div @click="row.toggleDetails">
            <b-checkbox style="display:inline;"></b-checkbox>
            <div style="display:inline;">{{ row.item.title}}</div>
          </div>
        </template>

        <template v-slot:cell(date)="row">
          <div @click="row.toggleDetails">{{ row.item.release_date}}</div>
        </template>

        <template v-slot:cell(description)="row">
          <div
            @click="row.toggleDetails"
            class="cut-text"
            style="font-size:12px;"
          >{{ row.item.overview}}</div>
        </template>

        <template v-slot:cell(time)="row">
          <div @click="row.toggleDetails">2:00</div>
        </template>

        <template v-slot:cell(imdb)="row">
          <div @click="row.toggleDetails">{{ Number(row.item.vote_average)}}</div>
        </template>

        <template v-slot:cell(votes)="row">
          <div @click="row.toggleDetails">{{ row.item.vote_count}}</div>
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
                          v-for="(n,index) in 3"
                          :key="index"
                          class="carous"
                          :index="index"
                          v-bind:style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w200/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)` }"
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
                    <b-tab v-for="(n,index) in 4" :key="index" :title="`Actor ${n}`" active>
                      <b-card-text>
                        <b-row>
                          <b-col cols="4">
                            <img
                              src="http://magoopecas.com.br/assets/admin/img/avatar.png"
                              height="100"
                              width="auto"
                            />
                            <star-rating
                              :star-size="20"
                              :rating="3.8"
                              :read-only="true"
                              :increment="0.01"
                              :show-rating="false"
                            ></star-rating>
                          </b-col>
                          <b-col cols="8">
                            <p>kjhgfghjkhgf fdfg ghfds gfddf gfdsff hgdfg</p>
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
      <b-col sm="5" md="6" class="my-1">
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

      <b-col sm="7" md="6" class="my-1">
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
Vue.component("star-rating", StarRating);

export default {
  name: "Table",
  props: ["items"],
  components: { Carousel3d, Slide, StarRating },
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "Movie Title",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "date",
          label: "Date",
          sortable: true,
          class: "text-center"
        },
        {
          key: "description",
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
          key: "imdb",
          label: "IMDB Average",
          sortable: true,
          class: "text-center",
          sortDirection: "desc"
        },
        {
          key: "votes",
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
      filter: null,
      filterOn: []
    };
  },
  computed: {
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
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