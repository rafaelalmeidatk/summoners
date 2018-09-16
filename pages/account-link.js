import React from 'react'
import Router from 'next/router'
import { Alert, Collapse, Button } from 'reactstrap'

import withAuthorization from '../lib/withAuthorization'
import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'
import SummonerSearchForm from '../components/SummonerSearchForm'
import { db } from '../firebase'
import RiotApi from '../lib/riotApi'

class AccountLinkPage extends React.Component {
  state = {
    region: null,
    summonerData: null,
    integrationCode: null,
    verifying: false,
    errorMessage: null,
  }

  handleSearchError = error => {
    this.setState({ errorMessage: error })
  }

  handleSummonerData = (region, summonerData) => {
    const { user } = this.props
    db.getUserData(user.uid).then(data => {
      this.setState({
        region,
        summonerData,
        integrationCode: data.integrationCode,
        errorMessage: null,
      })
    })
  }

  handleVerify = () => {
    this.setState({ verifying: true })
    const { user } = this.props
    const { region, summonerData, integrationCode } = this.state

    // First verify the integration code
    RiotApi.verifyIntegrationCode(region, integrationCode, summonerData.id)
      .then(() => RiotApi.getSummonerLinkData(region, summonerData.id))
      .then(linkRes => linkRes.data)
      .then(linkData =>
        db.linkSummonerWithUser(user.uid, region, summonerData, linkData).then(() => {
          Router.push('/account')
        }),
      )
      .catch(error => {
        console.log('error', error)
        this.setState({ errorMessage: 'Something went wrong, check the code and try again.' })
        this.setState({ verifying: false })
      })
  }

  render() {
    return (
      <Layout>
        <div className="container py-5">
          <h1>Account linking</h1>

          <SummonerSearchForm
            onSummonerData={this.handleSummonerData}
            onError={this.handleSearchError}
          />

          <Collapse isOpen={!!this.state.summonerData}>
            <div className="integration-code-container">
              <h2>Insert the verification code on your LoL client</h2>
              <div className="integration-steps">
                <div>
                  <span className="hg">1.</span>
                  <span>Open the settings menu in the LoL client</span>
                </div>
                <div>
                  <span className="hg">2.</span>
                  <span>Select "Verification" from the left menu</span>
                </div>
                <div>
                  <span className="hg">3.</span>
                  <span>
                    Enter the following verification code on the text input and press the SAVE
                    button
                  </span>
                  <div className="integration-code">{this.state.integrationCode}</div>
                </div>
                <div>
                  <span className="hg">4.</span>
                  <span>Click on the Verify button right below</span>
                </div>
              </div>
              <Button color="primary" onClick={this.handleVerify} disabled={this.state.verifying}>
                Verify
              </Button>
            </div>
          </Collapse>

          {this.state.errorMessage && <Alert color="danger">{this.state.errorMessage}</Alert>}
        </div>
        <style jsx global>{`
          .alert {
            margin-top: 24px;
          }
        `}</style>
        <style jsx>{`
          .integration-code-container {
            margin-top: 3rem;
          }

          .integration-steps {
            margin: 12px 2px;
          }

          .integration-steps .hg {
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.5em;
            font-weight: bold;
            margin-right: 4px;
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
