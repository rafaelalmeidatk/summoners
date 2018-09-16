import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { getTierIcon } from '../../lib/tierIcons'

const getRankedName = (rank, tier) => {
  if (!rank || !tier) return ''
  if (tier.toLowerCase() === 'challenger' || tier.toLowerCase() === 'master') return tier
  return tier + ' ' + rank
}

const PlayerCard = ({ player, className }) => {
  const {
    region,
    primaryRole,
    secondaryRole,
    lookingFor,
    profileIconId,
    rank,
    tier,
    lastPlayed,
  } = player

  const rolesText =
    primaryRole === secondaryRole ? primaryRole : `${primaryRole} - ${secondaryRole}`

  const isRanked = rank && tier
  const rankedName = isRanked && getRankedName(rank, tier)

  return (
    <Link
      href={{
        pathname: `/summoner/${region}/${player.displayName}`,
        query: { region, summonerName: player.displayName },
      }}
    >
      <div className={`playerCardWrapper${className ? ` ${className}` : ''}`}>
        <div
          className="playerCard"
          style={{
            backgroundImage: `url('http://www.stelar7.no/cdragon/latest/uncentered-splash-art/${lastPlayed}/0.png')`,
          }}
        >
          <div className="inner">
            <span className="header">
              <div className="lookinFor">{lookingFor || 'Not Specified'}</div>
            </span>
            <span
              className="avatar"
              style={{
                backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/8.18.2/img/profileicon/${profileIconId}.png')`,
              }}
            />
            <h2 className="name">{player.displayName}</h2>
            <div className="roles">{rolesText || 'Not Specified'}</div>
            <h4 className="rankName">{rankedName || 'UNRANKED'}</h4>
            <img src={getTierIcon(tier, rank)} alt={rankedName} className="rankImage" />
          </div>
        </div>

        <style jsx>{`
          .playerCardWrapper {
            cursor: pointer;
            padding-bottom: 45px;
          }

          .playerCard {
            border-radius: 4px;
            transition: transform 0.2s;
            background-size: cover;
            background-position: center center;
            text-align: center;
            border: 1px solid #c9b987;
            position: relative;
          }

          .playerCard:hover {
            transform: scale(1.02) translateY(-4px);
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
            margin-bottom: 0;
          }

          .roles {
            color: rgba(255, 255, 255, 0.6);
            font-weight: bold;
            font-size: 0.9em;
            margin-bottom: 10px;
            text-transform: uppercase;
          }

          .rankName {
            font-weight: 500;
            color: #e1ab36;
            font-size: 16px;
            margin-bottom: 0;
            text-transform: uppercase;
          }

          .header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            text-align: left;
          }

          .lookinFor {
            padding: 4px 0 4px 10px;
            background: linear-gradient(90deg, #c9b987, #c1a67d);
            display: inline-block;
            font-size: 14px;
            font-weight: 500;
            height: 30px;
            position: relative;
            text-transform: uppercase;
          }

          .lookinFor::after {
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
            background-size: cover;
            background-position: center center;
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
      </div>
    </Link>
  )
}

PlayerCard.displayName = 'PlayerCard'
PlayerCard.propTypes = {
  className: PropTypes.string,
}

export default PlayerCard
