import React from 'react'
import PropTypes from 'prop-types'

export const height = '60px'

const Toolbar = ({ className }) => (
  <div className="toolbar">
    <style jsx>{`
      .toolbar {
        height: ${height};
        color: #fff;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
      }

      .navbar {
        padding-top: 0;
        padding-bottom: 0;
        box-shadow: 0 1px rgba(255, 255, 255, 0.1);
      }

      .nav-link {
        height: ${height};
        padding: 20px 15px !important;
        color: #c9b987 !important;
      }

      .nav-link.active {
        color: #fff !important;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
        box-shadow: 0 1px rgba(255, 255, 255, 0.15);
      }
    `}</style>
    <div className="container">
      <div className="navbar px-0 navbar-dark navbar-expand">
        <a className="navbar-brand" href="/">
          Summoners
        </a>
        <div className="mr-auto" />
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link active">
              Invocadores
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Entrar
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Registrar
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

Toolbar.displayName = 'Toolbar'
Toolbar.propTypes = {
  className: PropTypes.string,
}
Toolbar.defaultProps = {
  className: undefined,
}

export default Toolbar
