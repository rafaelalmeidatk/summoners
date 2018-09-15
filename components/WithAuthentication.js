import React from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase'
import { loginUser } from '../ducks/session'

class WithAuthentication extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    const { loginUser } = this.props
    firebase.auth.onAuthStateChanged(authUser => {
      loginUser(authUser)
      this.setState({ user: authUser })
    })
  }

  render() {
    const { user } = this.state || {}

    // Inject the user for easy access on each page
    return React.Children.map(this.props.children, child =>
      React.cloneElement(this.props.children, { user }),
    )
  }
}

const mapDispatchToProps = { loginUser }

export default connect(
  null,
  mapDispatchToProps,
)(WithAuthentication)
