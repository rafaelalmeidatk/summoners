import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import FormGroupBordered from "./FormGroupBordered";

class LoginForm extends React.Component {
  borderChange = () => this.FormGroupBordered.changeBorder();

  render() {
    return (
      <Form className="form">
        <FormGroupBordered
          type="text"
          label="Summoner Name"
          placeholder=""
          ref={node => (this.FormGroupBordered = node)}
          onFocus={this.borderChange}
          onBlur={this.borderChange}
        />
        <FormGroupBordered
          type="password"
          label="Password"
          placeholder=""
          ref={node => (this.FormGroupBordered = node)}
          onFocus={this.borderChange}
          onBlur={this.borderChange}
        />
        <Button size="lg" className="btn-login" block>
          Login
        </Button>
        <Button outline color="secondary" size="lg" block>
          Dont have account? Register
        </Button>        
        <style jsx global>
          {`
            .form {
              width: 100%;
            }
            .btn-login {
              background: #a65fc5;
              margin-top: 25px;
            }
          `}
        </style>
      </Form>
    );
  }
}

export default LoginForm;
