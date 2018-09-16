import React from 'react'
import Error from 'next/error'
import { Row, Col } from 'reactstrap'

import RiotApi from '../lib/riotApi'
import { getTierIcon } from '../lib/tierIcons'

import RetrievingSummonerData from '../components/RetrievingSummonerData'
import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'
import MostPlayedChampion from '../components/MostPlayedChampion'

const heroHeight = '400px'

const getRankedName = (rank, tier) => {
  if (!rank || !tier) return ''
  if (tier.toLowerCase() === 'challenger' || tier.toLowerCase() === 'master') return tier
  return tier + ' ' + rank
}

class SummonerPage extends React.Component {
  static async getInitialProps({ req }) {
    const { host } = req.headers
    const { region, summonerName } = req.params
    const protocol = req.connection.encrypted ? 'https' : 'http'

    return {
      region,
      summonerName,
      baseUrl: `${protocol}://${host}`,
    }
  }

  state = {
    loading: true,
    data: null,
  }

  componentDidMount() {
    const { baseUrl, region, summonerName } = this.props
    this.setState({
      loading: false,
      data: JSON.parse(
        '{"summonerName":"Konoke Tk","summonerLevel":45,"profileIconId":983,"tier":"BRONZE","rank":"I","wins":4,"losses":8,"lastPlayed":141,"mostPlayed":[{"championId":"141","masteryLevel":5},{"championId":"51","masteryLevel":3},{"championId":"64","masteryLevel":7}],"matches":[{"gameDuration":2268,"spell1Id":11,"spell2Id":4,"win":true,"item0":1400,"item1":3211,"item2":3071,"item3":3111,"item4":3053,"item5":0,"item6":3340,"kills":4,"deaths":10,"assists":14},{"gameDuration":2046,"spell1Id":11,"spell2Id":4,"win":true,"item0":1419,"item1":3006,"item2":3031,"item3":3087,"item4":1042,"item5":0,"item6":3363,"kills":7,"deaths":13,"assists":14},{"gameDuration":1471,"spell1Id":11,"spell2Id":4,"win":true,"item0":1412,"item1":2031,"item2":3117,"item3":3071,"item4":3742,"item5":0,"item6":3340,"kills":9,"deaths":6,"assists":9},{"gameDuration":1467,"spell1Id":7,"spell2Id":4,"win":false,"item0":1055,"item1":3006,"item2":3031,"item3":3086,"item4":0,"item5":0,"item6":3340,"kills":2,"deaths":8,"assists":6},{"gameDuration":921,"spell1Id":7,"spell2Id":4,"win":true,"item0":1055,"item1":3031,"item2":3006,"item3":3094,"item4":0,"item5":0,"item6":3340,"kills":11,"deaths":1,"assists":2}]}',
      ),
    })
    return
    RiotApi.getSummonerPageData(baseUrl, region, summonerName).then(res => {
      console.log('Data returned', res.data)
      this.setState({ loading: false, data: res.data })
    })
  }

  render() {
    const { region, summonerName } = this.props
    if (!region || !summonerName) {
      return <Error statusCode={404} />
    }

    const { data, loading } = this.state

    return (
      <Layout>
        <div className="container py-5">
          {loading && <RetrievingSummonerData />}
          {data && (
            <Row>
              <Col md={6}>
                <div className="profile-data-wrapper">
                  <div
                    className="profile-icon"
                    style={{
                      backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/8.18.2/img/profileicon/${
                        data.profileIconId
                      }.png')`,
                    }}
                  />
                  <div className="profile-data">
                    <div>
                      <div className="profile-name">{data.summonerName}</div>
                      <div className="profile-level">Level {data.summonerLevel}</div>
                    </div>
                  </div>
                </div>

                <div className="stats">
                  <div className="stat-block">
                    <img
                      src={this.props.baseUrl + '/' + getTierIcon(data.tier, data.rank)}
                      alt={getRankedName(data.rank, data.tier)}
                      className="tier-image"
                    />
                    <div className="tier-name">{getRankedName(data.rank, data.tier)}</div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h2>Most played</h2>
                <div className="most-played-col">
                  {data.mostPlayed.map(played => (
                    <MostPlayedChampion championId={played.championId} />
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </div>

        <style jsx>{`
          .profile-data-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .profile-icon {
            width: 80px;
            height: 80px;
            background-size: cover;
            background-position: center center;
          }

          .profile-data {
            margin-left: 12px;
          }

          .profile-name {
            font-weight: bold;
            font-size: 2.5em;
            line-height: 1em;
          }

          .profile-level {
            font-weight: bold;
            color: rgba(255, 255, 255, 0.6);
          }

          .stats {
            margin-top: 24px;
          }

          .stat-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 30%;
            border-radius: 5px;
            min-height: 150px;
          }

          .tier-name {
            text-align: center;
            font-weight: bold;
            font-size: 1.5em;
            line-height: 1em;
            color: rgba(255, 255, 255, 0.9);
          }

          .tier-image {
            display: block;
            width: 100%;
          }

          .most-played-col {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        `}</style>
      </Layout>
    )
  }
}

export default SummonerPage
