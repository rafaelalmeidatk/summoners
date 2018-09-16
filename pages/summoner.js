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
    data: null,
  }

  componentDidMount() {
    const { baseUrl, region, summonerName } = this.props
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
      <Container>
        {!data && <h3>Hey, wait a minute, we are gathering all the data for you!</h3>}
        {data && <h3>Done!</h3>}
      </Container>
    )
  }
}

export default SummonerPage
