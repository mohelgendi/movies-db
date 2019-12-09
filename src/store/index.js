import Vue from 'vue'
import Vuex from 'vuex'
import moviesModule from './movies/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies: moviesModule,
  },
  strict: false
})
