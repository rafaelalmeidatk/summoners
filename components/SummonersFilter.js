export default class extends React.Component {
  state = {
    tiers: {
      challenger: true,
      master: true,
      diamond: true,
      platinum: true,
      gold: true,
      silver: true,
      bronze: true,
    },
    lookingForOpts: {
      duo: true,
      '3v3 team': true,
      '5v5 team': true,
    },
  }

  toggleOpt = (collection, key) => {
    // I should use redux for that but I
    // am already out of time so here we go
    this.setState(
      {
        [collection]: {
          ...this.state[collection],
          [key]: !this.state[collection][key],
        },
      },
      () => {
        this.props.onFilterChange && this.props.onFilterChange(this.state)
      },
    )
  }

  render() {
    const { tiers, lookingForOpts } = this.state
    return (
      <div>
        <div className="filter">
          <span className="label">Tier:</span>
          {Object.keys(tiers).map(tier => (
            <img
              onClick={() => this.toggleOpt('tiers', tier)}
              className={'selectable ' + (tiers[tier] && 'active')}
              src={`./static/img/tier_list/base_icons/${tier}.png`}
            />
          ))}
        </div>

        <div className="filter">
          <span className="label">Looking for: </span>
          {Object.keys(lookingForOpts).map(lookingFor => (
            <span
              onClick={() => this.toggleOpt('lookingForOpts', lookingFor)}
              className={'label selectable ' + (lookingForOpts[lookingFor] && 'active')}
            >
              {lookingFor}
            </span>
          ))}
        </div>

        <style jsx>{`
          .filter {
            background: #12222860;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 62px;
          }

          .selectable {
            cursor: pointer;
          }

          .label,
          img {
            border-radius: 6px;
            transition: background 0.3s;
            background: transparent;
          }

          .label {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.1em;
            color: rgba(255, 255, 255, 0.5);
            margin-right: 0.7rem;
          }

          img {
            display: block;
            width: 48px;
            margin-right: 0.7rem;
          }

          .active {
            background: rgba(255, 255, 255, 0.1);
          }

          .label.active {
            padding: 0 6px;
          }
        `}</style>
      </div>
    )
  }
}
