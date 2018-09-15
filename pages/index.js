import AuthUserContext from '../components/AuthUserContext';

export default () => (
  <div>
    <p>Let's go</p>
    <p>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? 'We have an user' : 'No user')}
      </AuthUserContext.Consumer>
    </p>
  </div>
);
