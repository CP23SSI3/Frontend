import * as yup from 'yup'

yup.setLocale({
  // mixed: {
  //   required: 'โปรดระบุ ${path}'
  // },
  string: {
    email: 'Invalid email',
    min: 'Please enter at least ${min} characters',
    max: 'Must be no more than ${max} characters.'
  },
  number: {
    positive: 'Please enter a positive integer',
    integer: 'Please enter an integer.'
  }
})

export default yup
