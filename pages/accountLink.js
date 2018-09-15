import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap'

import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'
import RiotApi, { regionNamesByCode } from '../lib/riotApi'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSearch = () => {
    const region = this.regionInput.value;
    const summonerName = this.summonerNameInput.value;
    RiotApi.findSummonerByName(region, summonerName);
  }

  render() {
    return (
      <Layout>
        <div className="hero">
          <div className="hero-inner">
            <div className="container py-5">
              <h1>Account linking</h1>

              <FormGroup>
                <Label for="region">Select your region</Label>
                <Input
                  type="select"
                  name="region"
                  id="region"
                  innerRef={node => (this.regionInput = node)}
                >
                  {Object.keys(regionNamesByCode).map(key => (
                    <option key={key} value={key}>
                      {regionNamesByCode[key]}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="summonerName">Type your summoner name</Label>
                <Input
                  type="text"
                  name="summonerName"
                  id="summonerName"
                  innerRef={node => (this.summonerNameInput = node)}
                />
              </FormGroup>

              <Button color="primary" onClick={this.handleSearch}>
                Search
              </Button>
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
        `}</style>
      </Layout>
    )
  }
}
