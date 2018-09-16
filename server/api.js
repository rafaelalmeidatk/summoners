const express = require('express')
const axios = require('axios').default

const endpoint = (region, url) => `https://${region}.api.riotgames.com/lol/${url}`

module.exports = () => {
  const router = express.Router()
  const riotApi = axios.create({
    headers: { 'X-Riot-Token': 'RGAPI-0cf2e377-066d-4db8-ab8e-ea91887a8659' },
  })
  const genericErrorHandler = (res, error) => {
    // Forward status code from Riot API
    if (error && error.response && error.response.status) {
      return res.sendStatus(error.response.status)
    }
    console.log('Unhandled error', error)
    res.sendStatus(500)
  }

  // Verify integration code
  router.get('/verifyCode/:region/:code/:summonerId', (req, res) => {
    const { region, code, summonerId } = req.params
    if (!region || !code || !summonerId) return res.sendStatus(400)

    riotApi
      .get(endpoint(region, 'platform/v3/third-party-code/by-summoner/' + summonerId))
      .then(apiRes => {
        const { data } = apiRes
        if (data === code) return res.sendStatus(200)
        res.sendStatus(400)
      })
      .catch(err => genericErrorHandler(res, err))
  })

  // Summoner by name
  router.get('/summoner/by-name/:region/:name', (req, res) => {
    const { region, name } = req.params
    if (!region || !name) return res.sendStatus(400)

    riotApi
      .get(endpoint(region, 'summoner/v3/summoners/by-name/' + encodeURI(name)))
      .then(apiRes => {
        const { data } = apiRes
        res.send(data)
      })
      .catch(err => genericErrorHandler(res, err))
  })

  // Get link data
  router.get('/link-data/:region/:summonerId', (req, res) => {
    const { region, summonerId } = req.params
    if (!region || !summonerId) return res.sendStatus(400)

    let accountId = null
    const linkData = {}

    Promise.resolve()
      .then(() =>
        riotApi.get(endpoint(region, 'summoner/v3/summoners/' + summonerId)).then(apiRes => {
          const { data } = apiRes
          accountId = data.accountId
        }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'league/v3/positions/by-summoner/' + summonerId))
          .then(apiRes => {
            const { data } = apiRes
            linkData.rankedData = data
          }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'match/v3/matchlists/by-account/' + accountId + '?endIndex=1'))
          .then(apiRes => {
            const { data } = apiRes
            linkData.lastPlayed = data.matches[0] && data.matches[0].champion
          }),
      )
      .then(() => res.send(linkData))
      .catch(err => genericErrorHandler(res, err))
  })

  // Get summoner page data
  router.get('/summoner-page/:region/:summonerName', (req, res) => {
    const { region, summonerName } = req.params
    if (!region || !summonerName) return res.sendStatus(400)

    let summonerId = null
    let accountId = null
    const pageData = {}

    Promise.resolve()
      .then(() =>
        riotApi
          .get(endpoint(region, 'summoner/v3/summoners/by-name/' + encodeURI(summonerName)))
          .then(apiRes => {
            const { data } = apiRes
            summonerId = data.id
            accountId = data.accountId

            pageData.summonerName = data.name
            pageData.summonerLevel = data.summonerLevel
            pageData.profileIconId = data.profileIconId
          }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'league/v3/positions/by-summoner/' + summonerId))
          .then(apiRes => {
            const { data } = apiRes
            if (data.length === 0) return
            const league = data[0]
            if (!league) return

            pageData.tier = league.tier
            pageData.rank = league.rank
            pageData.wins = league.wins
            pageData.losses = league.losses
          }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'match/v3/matchlists/by-account/' + accountId))
          .then(apiRes => {
            const { data } = apiRes
            const championsPlayed = {}
            for (let i = 0, len = data.matches.length; i < len; i++) {
              const champion = data.matches[i].champion
              if (!championsPlayed[champion]) {
                championsPlayed[champion] = 1
              } else {
                championsPlayed[champion]++
              }
            }

            const mostPlayed = []
            const mostPlayedBlacklist = []
            for (let i = 0; i < 3; i++) {
              let largest = -1
              let champion = null
              const champions = Object.keys(championsPlayed)
              for (let j = 0; j < champions.length; j++) {
                if (mostPlayedBlacklist.indexOf(champions[j]) >= 0) continue
                const val = championsPlayed[champions[j]]
                if (val > largest) {
                  largest = val
                  champion = champions[j]
                }
              }
              mostPlayed[i] = champion
              mostPlayedBlacklist.push(champion)
            }

            pageData.lastPlayed = data.matches[0] && data.matches[0].champion
            pageData.mostPlayed = mostPlayed
          }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'match/v3/matchlists/by-account/' + accountId))
          .then(async apiRes => {
            const { data } = apiRes

            const matches = []
            for (let i = 0; i < 5; i++) {
              const match = data.matches[i]
              if (!match) continue

              const matchData = (await riotApi.get(
                endpoint(region, 'match/v3/matches/' + match.gameId),
              )).data

              const { participantId } = matchData.participantIdentities.find(
                identity => identity.player.accountId === accountId,
              )

              const participant = matchData.participants.find(
                participant => participant.participantId === participantId,
              )

              const { stats } = participant

              matches.push({
                gameDuration: matchData.gameDuration,
                spell1Id: participant.spell1Id,
                spell2Id: participant.spell2Id,
                win: stats.win,
                item0: stats.item0,
                item1: stats.item1,
                item2: stats.item2,
                item3: stats.item3,
                item4: stats.item4,
                item5: stats.item5,
                item6: stats.item6,
                kills: stats.kills,
                deaths: stats.deaths,
                assists: stats.assists,
              })
            }

            pageData.matches = matches
          }),
      )
      .then(() =>
        riotApi
          .get(endpoint(region, 'champion-mastery/v3/champion-masteries/by-summoner/' + summonerId))
          .then(async apiRes => {
            const { data } = apiRes
            if (!data) return

            for (let i = 0; i < data.length; i++) {
              if (!data[i]) continue
              const mastery = data[i]
              const index = pageData.mostPlayed.indexOf(mastery.championId + '')
              if (index >= 0) {
                pageData.mostPlayed[index] = {
                  championId: pageData.mostPlayed[index],
                  masteryLevel: mastery.championLevel,
                }
              }
            }
          }),
      )
      .then(() => res.send(pageData))
      .catch(err => genericErrorHandler(res, err))
  })

  return router
}
