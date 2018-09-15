import React from 'react'
import Router from 'next/router'

import { firebase } from '../firebase'

export default Component =>
  class WithAuthorization extends React.Component {
    state = {
      authorized: false,
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) return Router.push('/login')
        this.setState({ authorized: true })
      })
    }

    render() {
      return this.state.authorized ? <Component {...this.props} /> : null
    }
  }
