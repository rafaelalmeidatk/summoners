import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '../Toolbar'

const Layout = ({ className, children }) => (
  <div className={className}>
    <Toolbar />
    {children}
  </div>
)

Layout.displayName = 'Layout'
Layout.propTypes = {
  className: PropTypes.string,
}

export default Layout
