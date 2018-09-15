import AuthUserContext from './AuthUserContext';
import { db } from '../firebase';

export default class extends React.Component {
  state = {
    loading: true,
    summonerId: null
  };

  getData = authuser => {
    if (authuser) {
      db.getUserData(authuser.uid).then(res => {
        const { summonerId } = res || {};
        this.setState({ loading: false, summonerId });
      });
    }
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {this.getData(authUser)}
            {this.state.loading && <div>Loading...</div>}
            {!this.state.loading && (
              <div>Summoner linked: {this.state.summonerId ? 'Yes' : 'No'}</div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
