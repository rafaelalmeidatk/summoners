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

  return router
}
