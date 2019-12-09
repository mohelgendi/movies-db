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
        <template v-slot:cell(name)="row">
          <div @click="row.toggleDetails">
            <b-checkbox style="display:inline;"></b-checkbox>
            <div style="display:inline;width:100%">{{ row.value.first }} {{ row.value.last }}</div>
          </div>
        </template>

        <template v-slot:cell(age)="row">
          <div @click="row.toggleDetails">{{ row.value}}</div>
        </template>

        <template v-slot:cell(actions)="row">
          <div @click="row.toggleDetails" style="width:100%"></div>
        </template>

        <template v-slot:row-details="row">
          <b-card>BBBBBBKKKKK</b-card>
        </template>
      </b-table>
    </div>
    <b-row>
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
export default {
  name: "Table",
  data() {
    return {
      items: [
        {
          isActive: true,
          age: 40,
          name: { first: "Dickerson", last: "Macdonald" }
        },
        { isActive: false, age: 21, name: { first: "Larsen", last: "Shaw" } },
        {
          isActive: false,
          age: 9,
          name: { first: "Mini", last: "Navarro" },
          _rowVariant: "success"
        },
        { isActive: false, age: 89, name: { first: "Geneva", last: "Wilson" } },
        { isActive: true, age: 38, name: { first: "Jami", last: "Carney" } },
        { isActive: false, age: 27, name: { first: "Essie", last: "Dunlap" } },
        { isActive: true, age: 40, name: { first: "Thor", last: "Macdonald" } },
        {
          isActive: true,
          age: 87,
          name: { first: "Larsen", last: "Shaw" },
          _cellVariants: { age: "danger", isActive: "warning" }
        },
        { isActive: false, age: 26, name: { first: "Mitzi", last: "Navarro" } },
        {
          isActive: false,
          age: 22,
          name: { first: "Genevieve", last: "Wilson" }
        },
        { isActive: true, age: 38, name: { first: "John", last: "Carney" } },
        { isActive: false, age: 29, name: { first: "Dick", last: "Dunlap" } }
      ],
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
          key: "imdb",
          label: "IMDB Average",
          sortable: true,
          class: "text-center"
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
      perPage: 10,
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
</style>