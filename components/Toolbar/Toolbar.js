import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'

export const height = '60px'

const Toolbar = ({ className, authenticatedUser }) => (
  <div className={`toolbar${className ? ` ${className}` : ''}`}>
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

      .nav-link:hover {
        box-shadow: 0 1px rgba(255, 255, 255, 0.15);
        color: #fff !important;
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
          {authenticatedUser ? (
            <React.Fragment>
              <li className="nav-item">
                <a href="" className="nav-link">
                  {authenticatedUser.displayName || 'My account'}
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">
                  Sair
                </a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link href="/login ">
                  <a href="/" className="nav-link">
                    Entrar
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register ">
                  <a href="/" className="nav-link">
                    Registrar
                  </a>
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  </div>
)

Toolbar.displayName = 'Toolbar'
Toolbar.propTypes = {
  className: PropTypes.string,
}

const mapStateToProps = ({ session }) => ({
  authenticatedUser: session.user,
})

export default connect(mapStateToProps)(Toolbar)
