import React from 'react';
import Link from 'next/link';
import { Button, Form } from 'reactstrap';
import FormGroupBordered from './FormGroupBordered';

class RegisterForm extends React.Component {
  render() {
    return (
      <Form className="form">
        <FormGroupBordered type="text" label="Email" placeholder="" />
        <FormGroupBordered type="password" label="Password" placeholder="" />
        <FormGroupBordered type="text" label="Repeat the password" placeholder="" />
        <Button size="lg" className="btn-register" block>
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
    );
  }
}

export default RegisterForm;
