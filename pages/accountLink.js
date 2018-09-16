import React from 'react'
import Router from 'next/router'
import { Alert, Button } from 'reactstrap'

import withAuthorization from '../lib/withAuthorization'
import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'
import SummonerSearchForm from '../components/SummonerSearchForm'
import { db } from '../firebase'
import RiotApi from '../lib/riotApi'

class AccountLinkPage extends React.Component {
  state = {
    summonerData: null,
    integrationCode: null,
    verifying: false,
    errorMessage: null,
  }

  handleSummonerData = summonerData => {
    const { user } = this.props
    db.getUserData(user.uid).then(data => {
      this.setState({ summonerData, integrationCode: data.integrationCode })
    })
  }

  handleVerify = () => {
    this.setState({ verifying: true })
    const { user } = this.props
    const { integrationCode, summonerData } = this.state

    RiotApi.verifyIntegrationCode(integrationCode, summonerData.id)
      .then(() => {
        console.log('Link successful')
        return db.linkSummonerWithUser(user.uid, summonerData).then(() => {
          Router.push('/account')
        })
      })
      .catch(() => {
        this.setState({ errorMessage: 'Something went wrong, check the code and try again.' })
        this.setState({ verifying: false })
      })
  }

  render() {
    return (
      <Layout>
        <div className="hero">
          <div className="hero-inner">
            <div className="container py-5">
              <h1>Account linking</h1>

              <SummonerSearchForm onSummonerData={this.handleSummonerData} />

              {this.state.summonerData && (
                <div className="integration-code-container">
                  <h2>Insert the following code on your LoL client</h2>
                  <div className="integration-code">{this.state.integrationCode}</div>
                  <Button
                    color="primary"
                    onClick={this.handleVerify}
                    disabled={this.state.verifying}
                  >
                    Verify
                  </Button>

                  {this.state.errorMessage && (
                    <Alert color="danger">{this.state.errorMessage}</Alert>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero {
            background: url('http://www.lol-wallpapers.com/wp-content/uploads/2017/01/Snowdown-Background-League-of-Legends-Artwork-Wallpaper-lol.jpg');
            background-size: cover;
          }

          .hero-inner {
            background: rgba(0, 0, 0, 0.3);
            width: 100%;
            height: 100%;
            padding-top: ${toolbarHeight};
            min-height: 500px;
          }

          .integration-code-container {
            margin-top: 3rem;
          }
          .integration-code {
            padding: 1rem;
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </Layout>
    )
  }
}

export default withAuthorization(AccountLinkPage)
