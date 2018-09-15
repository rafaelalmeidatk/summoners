import React from 'react'

class LoginForm extends React.Component {
  render() {
    return (
      <div className="cta">
        <h2>Find Summoners</h2>
        <h1>Build your Dream Team</h1>
        <p>
          Use our database to look and find player for your duo, team or just to make a few more
          friends.
        </p>
        <style jsx>
          {`
            .cta {
              text-align: ${this.props.align};
            }
            .cta h2 {
              color: #fff;
              font-size: 25px;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 15px;
              font-weight: normal;
            }
            .cta h1 {
              color: #fff;
              font-size: 55px;
              text-transform: uppercase;
              background: -webkit-linear-gradient(#35a5ff, #215279);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .cta p {
              color: #fff;
              font-size: 12px;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 15px;
              font-weight: normal;
            }
          `}
        </style>
      </div>
    )
  }
}

export default LoginForm
