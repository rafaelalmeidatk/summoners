import React from 'react';
import { Container, Row, Col } from "reactstrap";

import Logo from "../components/Logo";
import Title from "../components/Title";
import RegisterForm from '../components/RegisterForm'

class RegisterPage extends React.Component {
  render() {
    return (
      <Container fluid="true">
        <Row>
          <Col lg="4" className="login-wrapper">
            <Logo width="100px" margin="45px 0" />
            <RegisterForm />
          </Col>
          <Col lg="8" className="login-cta">
            <Title align="right" />
          </Col>
        </Row>
        <style jsx global>{`
          .login-wrapper {
            min-height: 100vh;
            padding: 35px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .login-cta {
            background: url('./static/img/bg_img/bg.jpg') no-repeat center center / cover;
            min-height: 100vh;
            padding: 45px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}</style>
      </Container>
    );
  }
}

export default RegisterPage;
