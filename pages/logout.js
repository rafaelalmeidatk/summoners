import React, { Component } from 'react'
import Router from 'next/router'
import { auth } from '../firebase'

export default class LogoutPage extends Component {
  componentDidMount() {
    auth
      .signOut()
      .catch(() => {})
      .then(() => Router.push('/'))
  }

  render() {
    return (
      <div>
        Logging out...
        <style jsx>{`
          div {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
