export default {
  UPDATE_FORM: (state, data) => {
    state.form = data
  },
  ADD_SECTION: (state, data) => {
    state.form.push({
      id: data.id,
      title: data.title,
      heading: data.heading,
      elements: data.elements
    })
  },
  REMOVE_SECTION: (state, id) => {
    state.form.forEach((section, i) => {
      if (id === section.id) {
        state.form.splice(i, 1)
      }
    })
  },
  ADD_ELEMENT: (state, data) => {
    state.form.forEach((section) => {
      if (data.sectionID === section.id) {
        section.elements.push(data.element)
      }
    })
  }
}
