export default {
  LOAD_TOPRATED: (state, data) => {
    state.topRated = data
  },
  LOAD_UPCOMING: (state, data) => {
    state.upComing = data
  },
  LOAD_POPULAR: (state, data) => {
    state.popular = data
  },
  LOAD_FAVOURITE: (state, data) => {
    state.favourite = data
  },
  UPDATE_FAVOURITE: (state, data) => {
    state.favourite = data
  },
  LOAD_CURRENT_TABLE_CONTENT: (state, data) => {
    switch (data) {
      case 'topRated':
        state.currentTableContent = state.topRated;
        break;
      case 'upComing':
        state.currentTableContent = state.upComing;
        break;
      case 'popular':
        state.currentTableContent = state.popular;
        break;
      case 'favourite':
        state.currentTableContent =  JSON.parse(window.localStorage.favourite);
        break;
    }
  }
}
