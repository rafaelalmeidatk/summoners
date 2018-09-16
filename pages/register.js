import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import Logo from '../components/Logo'
import Title from '../components/Title'
import RegisterForm from '../components/RegisterForm'

class RegisterPage extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="4" className="register-wrapper">
            <Logo width="100px" margin="45px 0" />
            <RegisterForm />
          </Col>
          <Col lg="8" className="register-cta">
            <Title align="right" />
          </Col>
        </Row>
        <style jsx global>{`
          .register-wrapper {
            min-height: calc(100vh - 50px);
            padding: 35px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .register-cta {
            background: url('./static/img/bg_img/bg.jpg') no-repeat center center / cover;
            min-height: calc(100vh - 50px);
            padding: 45px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}</style>
      </Container>
    )
  }
}

export default RegisterPage
