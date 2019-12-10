export default {
  LOAD_TOPRATED: (state, data) => {
    state.topRated = data
    state.currentTableContent = data
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
  LOAD_CURRENT_TABLE_CONTENT: (state, data) => {
    switch (data) {
      case 'topRated':
        state.currentTableContent = state.topRated.results;
        break;
      case 'upComing':
        state.currentTableContent = state.upComing.results;
        break;
      case 'popular':
        state.currentTableContent = state.popular.results;
        break;
      case 'favourite':
        state.currentTableContent = state.favourite;
        break;
    }
  }
}
