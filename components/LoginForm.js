import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import FormGroupBordered from "./FormGroupBordered";

class LoginForm extends React.Component {
  borderChange = () => this.FormGroupBordered.changeBorder();

  render() {
    return (
      <Form className="form">
        <FormGroupBordered
          label="Summoner Name"
          placeholder=""
          ref={node => (this.FormGroupBordered = node)}
          onFocus={this.borderChange}
          onBlur={this.borderChange}
        />
        <style jsx global>
          {`
            .form {
              width: 100%;
            }
          `}
        </style>
      </Form>
    );
  }
}

export default LoginForm;
