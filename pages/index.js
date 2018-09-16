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
        <div className="container py-5">
          <div className="presentation">
            <h2>Looking for someone to play with?</h2>
            <h3>Meet your next duo or team mates!</h3>

            <p>Bellow you can see all the summoners that are looking for company, use the filter and add someone on the game</p>
          </div>

          {this.state.loading && <h4>Loading...</h4>}
          <div className="row">
            {this.state.users.map(player => (
              <div key={player.uuid} className="col-6 col-md-3 mb-4">
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .presentation {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .presentation h3 {
            padding: 0 12px 7px;
            display: inline-block;
          }

          .presentation h2 {
            font-size: 3em;
            
          }
        `}</style>
      </Layout>
    )
  }
}
