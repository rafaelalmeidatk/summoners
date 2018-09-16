import React from 'react'
import withAuthorization from '../lib/withAuthorization'
import Layout from '../components/Layout'
import LoLAccountIntegration from '../components/LoLAccountIntegration'
import UserDatabaseFieldSelectInput from '../components/UserDatabaseFieldSelectInput'

const AccountPage = ({ user }) => (
  <Layout>
    <div className="container py-5">
      <h1>My account</h1>

      <h3>Email</h3>
      <p>{user ? user.email : 'Loading...'}</p>

      {user && (
        <>
          <h3>Primary role</h3>
          <UserDatabaseFieldSelectInput userId={user.uid} fieldName="primaryRole">
            <option>TOP</option>
            <option>MID</option>
            <option>BOT</option>
            <option>ADC</option>
            <option>JG</option>
            <option>SUP</option>
          </UserDatabaseFieldSelectInput>

          <h3>Secondary role</h3>
          <UserDatabaseFieldSelectInput userId={user.uid} fieldName="secondaryRole">
            <option>TOP</option>
            <option>MID</option>
            <option>BOT</option>
            <option>ADC</option>
            <option>JG</option>
            <option>SUP</option>
          </UserDatabaseFieldSelectInput>

          <h3>Looking for a</h3>
          <UserDatabaseFieldSelectInput userId={user.uid} fieldName="lookingFor">
            <option>Duo</option>
            <option>3v3 Team</option>
            <option>5v5 Team</option>
          </UserDatabaseFieldSelectInput>
        </>
      )}

      <h3>LoL account</h3>
      <LoLAccountIntegration />
    </div>

    <style jsx>{`
      h3 {
        margin-top: 24px;
      }
    `}</style>
  </Layout>
)

export default withAuthorization(AccountPage)
