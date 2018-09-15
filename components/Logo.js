import React from 'react'

class Logo extends React.Component {
  render() {
    return (
      <div>
        <img src="./static/img/logo-full.png" className="logo-project" />
        <style jsx>
          {`
            .logo-project {
              width: ${this.props.width};
              margin: ${this.props.margin};
            }
          `}
        </style>
      </div>
    )
  }
}

export default Logo
