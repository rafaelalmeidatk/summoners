import { Container, Row, Col } from 'reactstrap'
import Layout from '../components/Layout'
import { height as toolbarHeight } from '../components/Toolbar/Toolbar'

export default () => (
  <Layout>
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
    <div className="hero">
      <div className="hero-inner">
        <div className="container py-5">
          <h1>Encontre invocadores</h1>
        </div>
      </div>
    </div>
  </Layout>
)
