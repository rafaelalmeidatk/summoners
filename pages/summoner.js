import React from 'react'
import Error from 'next/error'
import { Container, Alert } from 'reactstrap'
import RiotApi from '../lib/riotApi'

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
  }

  componentDidMount() {
    const { baseUrl, region, summonerName } = this.props
    RiotApi.getSummonerPageData(baseUrl, region, summonerName).then(res => {
      console.log('the data', res.data)
    })
  }

  render() {
    const { region, summonerName, data, baseUrl } = this.props
    if (!region || !summonerName) {
      return <Error statusCode={404} />
    }

    console.log('the dsadsa', data, baseUrl)

    return <Container>hi</Container>
  }
}

export default SummonerPage
