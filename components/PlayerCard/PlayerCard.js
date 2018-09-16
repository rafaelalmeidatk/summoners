import React from 'react'
import PropTypes from 'prop-types'

const PlayerCard = ({ player, className }) => (
  <div className={`playerCardWrapper${className ? ` ${className}` : ''}`}>
    <style jsx>{`
      .playerCardWrapper {
        padding-bottom: 45px;
      }

      .playerCard {
        border-radius: 4px;
        transition: transform 0.2s;
        background-size: cover;
        background-position: right center;
        text-align: center;
        border: 1px solid #c9b987;
        position: relative;
      }

      .playerCard:hover {
        transform: scale(1.05) translateY(-2px);
      }

      .inner {
        background: linear-gradient(0deg, rgba(5, 24, 32, 0.8), rgba(5, 24, 32, 0.4));
        height: 100%;
        padding: 15px 15px 70px;
      }

      .name {
        font-size: 24px;
        display: block;
        text-overflow: ellipsis;
      }

      .rankName {
        font-weight: 500;
        color: #e1ab36;
        font-size: 16px;
      }

      .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: left;
      }

      .position {
        padding: 4px 0 4px 10px;
        background: linear-gradient(90deg, #c9b987, #c1a67d);
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        height: 30px;
        position: relative;
      }

      .position::after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 0 0 30px 30px;
        border-color: transparent #c1a67d;
        top: 0;
        right: -30px;
      }

      .avatar {
        width: 80px;
        height: 80px;
        display: block;
        background: #eee;
        border-radius: 50%;
        border: 2px solid #c9b987;
        margin: 20px auto;
      }

      .rankImage {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -75px;
        margin: auto;
        height: 150px;
      }
    `}</style>
    <div
      className="playerCard"
      style={{
        backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_0.jpg')`,
      }}
    >
      <div className="inner">
        <span className="header">
          <div className="position">TOP/SUPORT</div>
        </span>
        <span className="avatar" />
        <h2 className="name">{player.displayName}</h2>
        <h4 className="rankName">DIAMOND 4</h4>
        <img src="/static/img/tier_list/base_icons/diamond.png" alt="" className="rankImage" />
      </div>
    </div>
  </div>
)

PlayerCard.displayName = 'PlayerCard'
PlayerCard.propTypes = {
  className: PropTypes.string,
}

export default PlayerCard
