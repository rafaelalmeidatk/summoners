import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class FormGroupBordered extends React.Component {
  render() {
    const { label, ...props } = this.props;

    return (
      <FormGroup className="form-group">
        <Label>{label}</Label>
        <Input {...props} className="input" />

        <style jsx global>{`
          .form-control, .form-control:focus {
            color: #fff !important;
            background-color: transparent;
            border-width: none;
            outline: 0 !important;
            box-shadow: none !important;
          }

          .input {
            background: transparent;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #33434e;
            padding: 0;
            color: #fff;
            transition: border-width 0.1s;
          }

          .input:focus {
            border-color: #526979;
            border-bottom-width: 2px;
          }

          .form-group {
            margin-bottom: 45px;
          }

          .form-group label {
            color: #33434e;
            margin-bottom: 0;
          }
        `}</style>
      </FormGroup>
    );
  }
}

export default FormGroupBordered;
