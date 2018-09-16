import axios from 'axios'

export const regionNamesByCode = {
  NA1: 'NA1',
  EUN1: 'EUN1',
  EUW1: 'EUW1',
  BR1: 'BR1',
  RU: 'RU',
  KR: 'KR',
  OC1: 'OC1',
  JP1: 'JP1',
  TR1: 'TR1',
  LA1: 'LA1',
  LA2: 'LA2',
}

class RiotApi {
  constructor() {
    const instance = axios.create({
      baseURL: ' https://br1.api.riotgames.com/lol/',
      headers: {
        common: {
          'X-Riot-Token': 'RGAPI-c5b3a701-cd01-4904-9674-73f089e8cf22',
        },
      },
    })
    this.axios = instance
  }

  verifyIntegrationCode = (code, summonerId) => {
    return axios.get(`/verifyCode/${code}/${summonerId}`)
  }

  findSummonerByName = (regionCode, summonerName) => {
    const name = encodeURI(summonerName)
    const code = regionCode && regionCode.toLowerCase()
    return axios.get(`/summoner/byName/${code}/${name}`)
  }
}

export default new RiotApi()
