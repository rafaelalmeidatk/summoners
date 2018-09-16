import React from 'react'
import { Container } from 'reactstrap'

import withAuthorization from '../lib/withAuthorization'
import Navbar from '../components/Navbar'
import LoLAccountIntegration from '../components/LoLAccountIntegration'
import UserDatabaseFieldSelectInput from '../components/UserDatabaseFieldSelectInput'

const AccountPage = ({ user }) => (
  <div className="container-wrapper">
    <Container className="container">
      <Navbar />
      <div className="content">
        <h1>My account</h1>

        <h2>Email</h2>
        <p>dasdas@dasdsa.com</p>

        {user && (
          <>
            <h2>Primary role</h2>
            <UserDatabaseFieldSelectInput userId={user.uid} fieldName="primaryRole">
              <option>TOP</option>
              <option>MID</option>
              <option>BOT</option>
              <option>ADC</option>
              <option>JG</option>
              <option>SUP</option>
            </UserDatabaseFieldSelectInput>

            <h2>Secondary role</h2>
            <UserDatabaseFieldSelectInput userId={user.uid} fieldName="secondaryRole">
              <option>TOP</option>
              <option>MID</option>
              <option>BOT</option>
              <option>ADC</option>
              <option>JG</option>
              <option>SUP</option>
            </UserDatabaseFieldSelectInput>

            <h2>Looking for a</h2>
            <UserDatabaseFieldSelectInput userId={user.uid} fieldName="lookingFor">
              <option>Duo</option>
              <option>3v3 Team</option>
              <option>5v5 Team</option>
            </UserDatabaseFieldSelectInput>
          </>
        )}

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
