import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class FormGroupBordered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderActive: false
    };
  }

  changeBorder = () => this.setState({ borderActive: this.state.borderActive ? false : true });

  render() {
    return <FormGroup className="formGroup">
        <Label>{this.props.label}</Label>
        <Input placeholder={this.props.placeholder} />
        <style jsx global>
          {`
            .formGroup {
              border-left: ${this.state.borderActive ? "2px solid red" : "0"};
            }
            .formGroup label {
              color: #33434e;
              margin-bottom: 0;
            }
            .formGroup input {
              background: transparent;
              border: none;
              border-radius: 0;
              border-bottom: 1px solid #33434e;
              padding: 0;
              font-size: 20px;
              color: #fff;
            }
            .form-control:focus {
              color: #fff;
              background-color: transparent;
              border: none;
              outline: 0;
              box-shadow: none;
            }
            .formGroup input: hover, .formGroup input:active, .formGroup input:focus, .form-control:focus {
              background: transparent !important;
              box-shadow: none !important;
              border: none !important;
            }`}
        </style>
      </FormGroup>;
  }
}

export default FormGroupBordered;
