import { Container, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import PlayerCard from '../components/PlayerCard'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'

const players = [
  { uuid: 'qwe', displayName: 'John doe' },
  { uuid: 'qwe2', displayName: 'John doe 2' },
  { uuid: 'qwe3', displayName: 'John doe 3' },
  { uuid: 'qwe4', displayName: 'John doe 4' },
]
const heroHeight = '400px'
export default () => (
  <Layout>
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
    <div className="page">
      <div className="hero" />
      <div className="hero-inner">
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
      </div>
    </div>
  </Layout>
)
