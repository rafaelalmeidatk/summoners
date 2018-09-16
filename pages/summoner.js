import React from 'react'
import Error from 'next/error'
import { Container, Alert } from 'reactstrap'
import RiotApi from '../lib/riotApi'

import RetrievingSummonerData from '../components/RetrievingSummonerData'
import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'

const heroHeight = '400px'

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
    // return
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

    const { data } = this.state

    return (
      <Layout>
        <div className="container py-5">
          {!data && <RetrievingSummonerData />}
          {data && <h3>Done!</h3>}
        </div>

        <style jsx>{`
          .page {
            background: #051820;
          }

          .hero {
            background-image: linear-gradient(0deg, #051820, rgba(5, 24, 32, 0.7)),
              url('http://www.lol-wallpapers.com/wp-content/uploads/2017/01/Snowdown-Background-League-of-Legends-Artwork-Wallpaper-lol.jpg');
            background-size: cover;
            height: ${heroHeight};
          }

          .hero-inner {
            width: 100%;
            min-height: 100vh;
            padding-top: ${toolbarHeight};
            margin-top: -${heroHeight};
          }
        `}</style>
      </Layout>
    )
  }
}

export default SummonerPage
