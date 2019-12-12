import axios from 'axios';
import { addCastAndImages } from '../../helpers/helpers'
export default {
  loadToprated({ commit }) {
    axios.get(`${process.env.VUE_APP_API_URL}/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}&language=en`)
      .then(res => {
        commit('LOAD_TOPRATED', addCastAndImages(res.data.results))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadUpcoming({ commit }) {
    axios.get(`${process.env.VUE_APP_API_URL}/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}&language=en`)
      .then(res => {
        commit('LOAD_UPCOMING', addCastAndImages(res.data.results))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadPopular({ commit }) {
    axios.get(`${process.env.VUE_APP_API_URL}/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en`)
      .then(res => {
        commit('LOAD_POPULAR', addCastAndImages(res.data.results))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadFavourite({ commit }) {
    commit('LOAD_FAVOURITE', JSON.parse(window.localStorage.favourite==undefined?'[]':window.localStorage.favourite))
  },
  updateFavourite({ commit }, data) {
    commit('UPDATE_FAVOURITE', data)
  },
  loadCurrentTableContent({ commit }, data) {
    commit('LOAD_CURRENT_TABLE_CONTENT', data)
  }
}
