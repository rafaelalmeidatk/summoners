import React from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase'
import { loginUser } from '../ducks/session'

class WithAuthentication extends React.Component {
  componentDidMount() {
    const { loginUser } = this.props
    firebase.auth.onAuthStateChanged(authUser => {
      loginUser(authUser)
    })
  }

  render() {
    return this.props.children
  }
}

const mapDispatchToProps = { loginUser }

export default connect(
  null,
  mapDispatchToProps,
)(WithAuthentication)
