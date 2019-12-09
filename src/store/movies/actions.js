
export default {
  addProduct ({ commit }, category) {
    commit('ADD_PRODUCT', category)
  },
  addProvider ({ commit }, data) {
    commit('ADD_PROVIDER', {
      selectedSegment: data.selectedSegment,
      provider: data.provider
    })
  },
  addSection ({ commit }, data) {
    commit('ADD_SECTION', {
      title: data.title,
      heading: data.heading,
      elements: data.elements
    })
  },
  removeSection ({ commit }, id) {
    commit('REMOVE_SECTION', id)
  },
  addElement ({ commit }, data) {
    commit('ADD_ELEMENT', data)
  },
  imTheSameFun () {
    alert('FORM')
  }
}
