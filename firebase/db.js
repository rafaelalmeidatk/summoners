import randomstring from 'randomstring'
import { db } from './firebase'

export const registerUser = (id, email) => {
  // The integrationCode will be utilized later
  // to link the user with a summoner name
  const integrationCode = randomstring.generate()
  return db.ref(`users/${id}`).set({
    email,
    integrationCode,
  })
}

export const getAllUsers = () =>
  new Promise(resolve =>
    db
      .ref(`users`)
      .once('value')
      .then(snapshot => resolve(snapshot.val())),
  )

export const getUserData = id => {
  return new Promise(resolve => {
    db.ref(`users/${id}`)
      .once('value')
      .then(snapshot => resolve(snapshot.val()))
  })
}

export const linkSummonerWithUser = (userId, region, summonerData, linkData) => {
  return db.ref(`users/${userId}`).update({
    region,
    riotAccountId: summonerData.accountId,
    summonerId: summonerData.id,
    summonerName: summonerData.name,
    summonerProfileIconId: summonerData.profileIconId,
    summonerLevel: summonerData.summonerLevel,
    linkData,
  })
}

export const updateProfileField = (userId, field, value) => {
  return db.ref(`users/${userId}/profile`).update({
    [field]: value,
  })
}
