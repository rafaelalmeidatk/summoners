import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import Link from 'next/link'
import { db } from '../firebase'

class LoLAccountIntegration extends React.Component {
  state = {
    loading: true,
    summonerId: null,
  }

  componentDidMount() {
    const { user } = this.props
    if (!user) {
      return this.setState({ loading: false })
    }

    db.getUserData(user.uid).then(res => {
      const { summonerId } = res || {}
      this.setState({ loading: false, summonerId })
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {this.state.summonerId && (
          <Alert color="success">Your summoner is linked with your account!</Alert>
        )}
        {!this.state.summonerId && (
          <Alert color="warning">
            <p>Oops, seems your don't have an account linked yet.</p>
            <p>
              Click <Link href="/account-link">here</Link> to link your account!
            </p>
          </Alert>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
  }
}

export default connect(mapStateToProps)(LoLAccountIntegration)
