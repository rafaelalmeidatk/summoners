import React from 'react'
import Link from 'next/link'
import Error from 'next/error'
import { Row, Col } from 'reactstrap'

import RiotApi from '../lib/riotApi'
import { getTierIcon } from '../lib/tierIcons'

import RetrievingSummonerData from '../components/RetrievingSummonerData'
import Layout from '../components/Layout'
import MostPlayedChampion from '../components/MostPlayedChampion'

const getRankedName = (rank, tier) => {
  if (!rank || !tier) return ''
  if (tier.toLowerCase() === 'challenger' || tier.toLowerCase() === 'master') return tier
  return tier + ' ' + rank
}

const getOpGgLink = (region, summonerName) => {
  if (!region || !summonerName) return null
  let regionCode = region
  if (parseInt(region[region.length - 1], 10) >= 0) {
    regionCode = region.substring(0, region.length - 1)
  }
  return `https://${regionCode}.op.gg/summoner/userName=${summonerName}`
}

class SummonerPage extends React.Component {
  static async getInitialProps({ req }) {
    const { host } = req.headers
    const { region, summonerName } = req.params
    const protocol = req.connection.encrypted ? 'https' : 'http'

    return {
      region,
      summonerName,
      baseUrl: `https://${host}`,
    }
  }

  state = {
    loading: true,
    data: null,
  }

  componentDidMount() {
    const { baseUrl, region, summonerName } = this.props
    RiotApi.getSummonerPageData(baseUrl, region, summonerName).then(res => {
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
            <>
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
                    <div className="stat-block">
                      <div className="win-loss-value">{data.wins}</div>
                      <div className="win-loss-label">Wins</div>
                    </div>
                    <div className="stat-block">
                      <div className="win-loss-value">{data.losses}</div>
                      <div className="win-loss-label">Losses</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <h2>Most played</h2>
                  <div className="most-played-col">
                    {data.mostPlayed.map((played, index) => (
                      <MostPlayedChampion key={index} championId={played.championId} />
                    ))}
                  </div>
                </Col>
              </Row>

              <Row style={{ marginTop: 62 }}>
                <Col>
                  <div className="opdotgg">
                    <img src="https://opgg-static.akamaized.net/images/logo/logo-opgg.png" />
                    <h4>
                      Wanna see more data? Check this summoner on{' '}
                      <Link href={getOpGgLink(region, summonerName)}>op.gg</Link>{' '}
                    </h4>
                  </div>
                </Col>
              </Row>
            </>
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
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
            width: 90%;
          }

          .win-loss-value {
            text-align: center;
            font-weight: bold;
            font-size: 2.5em;
            line-height: 1em;
            color: rgba(255, 255, 255, 0.9);
          }
          .win-loss-label {
            text-align: center;
            font-size: 1.1em;
            color: rgba(100, 100, 100, 0.9);
          }

          .most-played-col {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .opdotgg {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .opdotgg img {
            margin-bottom: 12px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default SummonerPage
