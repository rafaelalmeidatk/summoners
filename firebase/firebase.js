import firebase from 'firebase/app';
import 'firebase/auth';

let config = {
  apiKey: 'AIzaSyCsuHpc_FERR813x2kMepmikEPphQKzbpk',
  authDomain: 'summoners-4f7e5.firebaseapp.com',
  databaseURL: 'https://summoners-4f7e5.firebaseio.com',
  projectId: 'summoners-4f7e5',
  storageBucket: 'summoners-4f7e5.appspot.com',
  messagingSenderId: '539192227824'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
