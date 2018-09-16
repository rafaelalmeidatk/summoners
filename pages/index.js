import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'

const players = [
  { uuid: 'qwe', displayName: 'John doe' },
  { uuid: 'qwe2', displayName: 'John doe 2' },
  { uuid: 'qwe3', displayName: 'John doe 3' },
  { uuid: 'qwe4', displayName: 'John doe 4' },
]
export default () => (
  <Layout>
    <div className="container py-5">
      <h1 className="mb-4">Encontre invocadores</h1>
      <div className="row">
        {players.map(player => (
          <div key={player.uuid} className="col-6 col-md-3 mb-4">
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </div>
  </Layout>
)
