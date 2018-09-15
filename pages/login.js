import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import Router from 'next/router'

import { loginUser } from '../ducks/session'
import Logo from '../components/Logo'
import Title from '../components/Title'
import LoginForm from '../components/LoginForm'

class LoginPage extends React.Component {
  handleLoginSuccess = user => {
    this.props.loginUser(user)
    Router.push('/')
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="4" className="login-wrapper">
            <Logo width="100px" margin="45px 0" />
            <LoginForm onLoginSuccess={this.handleLoginSuccess} />
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
    )
  }
}

const mapDispatchToProps = { loginUser }

export default connect(
  null,
  mapDispatchToProps,
)(LoginPage)
