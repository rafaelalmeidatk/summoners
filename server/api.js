const express = require('express')
const axios = require('axios').default

const endpoint = (region, url) => `https://${region}.api.riotgames.com/lol/${url}`

module.exports = () => {
  const router = express.Router()
  const riotApi = axios.create({
    headers: { 'X-Riot-Token': 'RGAPI-c5b3a701-cd01-4904-9674-73f089e8cf22' },
  })

  // Summoner by name
  router.get('/summoner/byName/:region/:name', (req, res) => {
    const { region, name } = req.params
    if (!region || !name) return res.status(400)

    riotApi.get(endpoint(region, 'summoner/v3/summoners/by-name/' + name)).then(apiRes => {
      const { data } = apiRes
      res.send(data)
    })
  })

  return router
}
