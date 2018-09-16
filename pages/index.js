import { Container, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'
import { db } from '../firebase'

// Let's leave this here just so you guys know the format of data
const players = [
  {
    uuid: 'qwe',
    displayName: 'John doe',
    lookingFor: '3v3 Team',
    primaryRole: 'Jungler',
    secondaryRole: 'Top',
    rank: 'I',
    tier: 'BRONZE',
    profileIconId: 983,
    lastPlayed: 141,
    region: 'BR1',
  },
]
const heroHeight = '400px'

export default class extends React.Component {
  state = {
    loading: true,
    users: [],
  }

  async componentDidMount() {
    const users = await db.getAllUsers()
    const arrayUsers = this.usersObjectToArray(users)
    const stateUsers = arrayUsers
      .map(u => this.convertUserDataToPlayerCardData(u))
      .filter(user => user.displayName)

    this.setState({ users: stateUsers, loading: false })
  }

  usersObjectToArray = objectList => {
    const keys = Object.keys(objectList)
    return keys.map(key => ({
      id: key,
      ...objectList[key],
    }))
  }

  convertUserDataToPlayerCardData = userData => {
    return {
      uuid: userData.id,
      displayName: userData.summonerName,
      lookingFor: userData.profile && userData.profile.lookingFor,
      primaryRole: userData.profile && userData.profile.primaryRole,
      secondaryRole: userData.profile && userData.profile.secondaryRole,
      rank: this.extractRelevantRankedData(userData.linkData).rank,
      tier: this.extractRelevantRankedData(userData.linkData).tier,
      profileIconId: userData.summonerProfileIconId,
      lastPlayed: userData.linkData && userData.linkData.lastPlayed,
      region: userData.region,
    }
  }

  extractRelevantRankedData = linkData => {
    if (!linkData || !linkData.rankedData || linkData.rankedData.length <= 0) return {}
    return linkData.rankedData[0]
  }

  render() {
    return (
      <Layout>
        <div className="page">
          <div className="hero" />
          <div className="hero-inner">
            <div className="container py-5">
              <h1 className="mb-4">Encontre invocadores</h1>
              <div className="row">
                {this.state.loading && <h4>Loading...</h4>}
                {this.state.users.map(player => (
                  <div key={player.uuid} className="col-6 col-md-3 mb-4">
                    <PlayerCard player={player} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
