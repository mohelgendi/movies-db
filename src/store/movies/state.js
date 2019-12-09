export default {
  form: [],
  form_elements: [
    {
      id: '',
      label: 'Input',
      element: 'b-input',
      icon: 'text-short',
      type: 'text',
      placeholder: 'Example Input'
    },
    {
      id: '',
      label: 'Textarea',
      element: 'b-input',
      icon: 'text-subject',
      type: 'textarea',
      placeholder: 'Example Textarea'
    },
    {
      id: '',
      label: 'Select',
      element: 'b-select',
      type: 'select',
      icon: 'check',
      placeholder: 'Example Select',
      options: [
        {
          id: '',
          title: 'Option 1',
          value: '1'
        },
        {
          id: '',
          title: 'Option 2',
          value: '2'
        },
        {
          id: '',
          title: 'Option 3',
          value: '3'
        }
      ]
    }
  ],
  information_area: [
    {
      id: '',
      label: 'Text Block',
      element: 'p',
      icon: 'format-text',
      type: 'p',
      placeholder: 'Text Block'
    },
    {
      id: '',
      label: 'Heading Block',
      element: 'heading',
      icon: 'text-short',
      type: 'heading',
      placeholder: 'Heading Block'
    },
    {
      id: '',
      label: 'Image Block',
      element: 'img',
      icon: 'file-image',
      type: 'img',
      placeholder: 'Image Block',
      url: ''
    }
  ]
}
