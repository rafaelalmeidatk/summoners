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

  // Get ranked data
  router.get('/league-positions/:region/:summonerId', (req, res) => {
    const { region, summonerId } = req.params
    if (!region || !summonerId) return res.sendStatus(400)

    riotApi
      .get(endpoint(region, 'league/v3/positions/by-summoner/' + summonerId))
      .then(apiRes => {
        const { data } = apiRes
        res.send(data)
      })
      .catch(err => genericErrorHandler(res, err))
  })

  // Get summoner page data
  router.get('/summoner-page/:region/:summonerName', (req, res) => {
    const { region, summonerName } = req.params
    if (!region || !summonerName) return res.sendStatus(400)

    console.log('arrived here', region, summonerName)

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
            console.log(accountId)

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

            pageData.mostPlayed = mostPlayed
          }),
      )
      .then(() => res.send(pageData))

      .catch(err => genericErrorHandler(res, err))
  })

  return router
}
