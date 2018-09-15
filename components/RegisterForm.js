import React from 'react'
import Link from 'next/link'
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

    cpassword: yup
      .string()
      .sameAs(yup.ref('password'), 'Passwords do not match')
      .required('Password confirmation is required'),
  }),
  handleSubmit: (values, { props, setStatus, setSubmitting }) => {
    const { email, password } = values

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => db.registerUser(authUser.user.uid, email))
      .then(() => {
        console.log('Success!')
        // TODO: Redirect to account page
      })
      .catch(error => {
        console.log('error', error)
        setSubmitting(false)
      })
  },
})

const RegisterForm = props => {
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

      <FormGroupBordered
        id="cpassword"
        type="password"
        label="Repeat the password"
        placeholder=""
        errorMessage={getErrors('cpassword')}
        invalid={!!getErrors('cpassword')}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button block type="submit" size="lg" className="btn-register" disabled={isSubmitting}>
        Register
      </Button>

      <p className="register-text">
        Already have an account?{' '}
        <Link href="/login">
          <a className="register-link">Login</a>
        </Link>
      </p>

      <style jsx global>{`
        .form {
          width: 100%;
        }
        .btn-register {
          background: #0f2e43;
          border: 0;
          margin-top: 25px;
        }
        .register-text {
          margin-top: 20px;
          text-align: center;
        }
        .register-text a {
          color: white;
          font-weight: bold;
        }
      `}</style>
    </Form>
  )
}

export default formikEnhancer(RegisterForm)
