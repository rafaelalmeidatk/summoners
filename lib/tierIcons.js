export const getTierIcon = (tier, rank) => {
  if (!tier || !rank) {
    return `./static/img/tier_list/base_icons/provisional.png`
  }
  if (tier.toLowerCase() === 'challenger') {
    return `./static/img/tier_list/base_icons/challenger.png`
  }
  if (tier.toLowerCase() === 'master') {
    return `./static/img/tier_list/base_icons/master.png`
  }
  return `./static/img/tier_list/tier_icons/${tier.toLowerCase()}_${rank.toLowerCase()}.png`
}
