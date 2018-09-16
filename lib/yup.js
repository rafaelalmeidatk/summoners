import * as yup from 'yup'

yup.addMethod(yup.mixed, 'sameAs', function(ref, message) {
  return this.test('sameAs', message, function(value) {
    let other = this.resolve(ref)
    return !other || !value || value === other
  })
})

export default yup
