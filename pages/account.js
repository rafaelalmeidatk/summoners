import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import withAuthorization from '../lib/withAuthorization'
import Navbar from '../components/Navbar'
import LoLAccountIntegration from '../components/LoLAccountIntegration'

const AccountPage = props => (
  <div className="container-wrapper">
    <Container className="container">
      <Navbar />
      <div className="content">
        <h1>My account</h1>

        <h2>Email</h2>
        <p>dasdas@dasdsa.com</p>

        <h2>LoL account</h2>
        <LoLAccountIntegration />
      </div>
    </Container>

    <style jsx>{`
      .container-wrapper {
        background: url('./static/img/freljord.jpg') no-repeat center center / cover;
        min-height: 100vh;
      }
      .content {
        background: rgba(0, 0, 0, 0.3);
        padding: 3rem 2rem;
      }
      h2 {
        margin-top: 24px;
      }
    `}</style>
  </div>
)

export default withAuthorization(AccountPage)
