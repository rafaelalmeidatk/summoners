import React from 'react'

export default class extends React.Component {
  state = {
    dots: '',
  }

  interval = null

  componentDidMount() {
    this.interval = setInterval(() => {
      const { dots } = this.state
      this.setState({ dots: dots.length < 3 ? dots + '.' : '' })
    }, 500)
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <h2>
          Wait a minute, we are gathering all the data for you
          {this.state.dots}
        </h2>
        <img src="https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b4/LoL_Facebook_Icon_23.png/revision/latest?cb=20161029214109" />

        <style jsx>{`
          div {
            text-align: center;
          }
          h2 {
            margin-bottom: 12px;
          }
        `}</style>
      </div>
    )
  }
}
