import axios from 'axios';
let apiURL = 'https://api.themoviedb.org/3';
let apiKey = '96e7d4223b658d3d50bfe77083eaa6d0';
export default {
  loadToprated({ commit }) {
    axios.get(`${apiURL}/movie/top_rated?api_key=${apiKey}&language=en`)
      .then(res => {
        commit('LOAD_TOPRATED', res.data)
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadUpcoming({ commit }) {
    axios.get(`${apiURL}/movie/upcoming?api_key=${apiKey}&language=en`)
      .then(res => {
        commit('LOAD_UPCOMING', res.data)
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadPopular({ commit }) {
    axios.get(`${apiURL}/movie/popular?api_key=${apiKey}&language=en`)
      .then(res => {
        commit('LOAD_POPULAR', res.data)
      })
      .catch(err => {
        alert(JSON.stringify(err))
      });
  },
  loadFavourite({ commit }) {
    commit('LOAD_FAVOURITE', window.localStorage.favourite)
  },
  loadCurrentTableContent({ commit }, data) {
    commit('LOAD_CURRENT_TABLE_CONTENT', data)
  }
}
