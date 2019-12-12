import axios from 'axios';
import { addCastAndImages } from '../../helpers/helpers'
let apiURL = 'https://api.themoviedb.org/3';
let apiKey = '96e7d4223b658d3d50bfe77083eaa6d0';
export default {
  loadToprated({ commit }) {
    axios.get(`${apiURL}/movie/top_rated?api_key=${apiKey}&language=en`)
      .then(res => {
        commit('LOAD_TOPRATED', addCastAndImages(res.data.results))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadUpcoming({ commit }) {
    axios.get(`${apiURL}/movie/upcoming?api_key=${apiKey}&language=en`)
      .then(res => {
        commit('LOAD_UPCOMING', addCastAndImages(res.data.results))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadPopular({ commit }) {
    axios.get(`${apiURL}/movie/popular?api_key=${apiKey}&language=en`)
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
