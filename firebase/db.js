import randomstring from 'randomstring'
import { db } from './firebase'

export const registerUser = (id, email) => {
  // The integrationCode will be utilized later
  // to link the user with a summoner name
  const integrationCode = randomstring.generate()
  db.ref(`users/${id}`).set({
    email,
    integrationCode,
  })
}

export const getUserData = id => {
  return new Promise(resolve => {
    db.ref(`users/${id}`)
      .once('value')
      .then(snapshot => resolve(snapshot.val()));
  });
};
