import React from 'react'
import PropTypes from 'prop-types'
import Toolbar, { toolbarHeight } from '../Toolbar'

const heroHeight = '600px'
const Layout = ({ className, children }) => (
  <div className={className}>
    <Toolbar />
    <div className="page">
      <div className="hero" />
      <div className="hero-inner">{children}</div>
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
  </div>
)

Layout.displayName = 'Layout'
Layout.propTypes = {
  className: PropTypes.string,
}

export default Layout
