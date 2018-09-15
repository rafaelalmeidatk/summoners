import { connect } from 'react-redux'
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
    return (
      <div>
        {this.state.loading && <div>Loading...</div>}
        {!this.state.loading && <div>Summoner linked: {this.state.summonerId ? 'Yes' : 'No'}</div>}
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
