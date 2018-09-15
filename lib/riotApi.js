import axios from 'axios'

export const regionNamesByCode = {
  NA1: 'Any NA1',
  EUN1: 'Any EUN1',
  EUW1: 'Any EUW1',
  BR1: 'Any BR1',
  RU: 'Any RU',
  KR: 'Any KR',
  OC1: 'Any OC1',
  JP1: 'Any JP1',
  TR1: 'Any TR1',
  LA1: 'Any LA1',
  LA2: 'Any LA2',
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

  findSummonerByName = (regionCode, summonerName) => {
    console.log(' ur', '/summoner/v3/summoners/by-name/' + encodeURI(summonerName))
    // return this.axios
    //   .get('/summoner/v3/summoners/by-name/' + encodeURI(summonerName), {
    //     headers: { 'X-Riot-Token': 'RGAPI-c5b3a701-cd01-4904-9674-73f089e8cf22' },
    //   })
    //   .then(res => {
    //     console.log(' te', res)
    //   })

    axios
      .get('/summoner/byName/br1/Konoke%20Tk', {
        // headers: {
        //   "X-Riot-Token": "RGAPI-c5b3a701-cd01-4904-9674-73f089e8cf22"
        // }
      })
      .then(res => {
        console.log(' r,', res)
      })
  }
}

export default new RiotApi()
