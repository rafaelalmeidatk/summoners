import React from 'react'
import { Button, Form } from 'reactstrap'
import { withFormik } from 'formik'

import { auth, db } from '../firebase'
import yup from '../lib/yup'
import FormGroupBordered from './FormGroupBordered'

const formikEnhancer = withFormik({
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),

    password: yup
      .string()
      .min(6, 'Password should have at least 6 characters')
      .required('Password is required'),
  }),
  handleSubmit: (values, { props, setStatus, setSubmitting }) => {
    const { email, password } = values

    auth
      .login(email, password)
      .then(user => {
        console.log('gotcha!', user)
        props && props.onLoginSuccess(user)
      })
      .catch(error => {
        console.log('error', error)
        setSubmitting(false)
      })
  },
})

const LoginForm = props => {
  const { touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } = props

  const getErrors = param => {
    return errors[param] && touched[param] ? errors[param] : ''
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <FormGroupBordered
        id="email"
        type="text"
        label="Email"
        placeholder=""
        errorMessage={getErrors('email')}
        invalid={!!getErrors('email')}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <FormGroupBordered
        id="password"
        type="password"
        label="Password"
        placeholder=""
        errorMessage={getErrors('password')}
        invalid={!!getErrors('password')}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button block type="submit" size="lg" className="btn-login" disabled={isSubmitting}>
        Login
      </Button>

      <Button outline color="secondary" size="lg" block>
        Dont have account? Register
      </Button>

      <style jsx global>{`
        .form {
          width: 100%;
        }
        .btn-login {
          background: #a65fc5;
          margin-top: 25px;
        }
      `}</style>
    </Form>
  )
}

export default formikEnhancer(LoginForm)
