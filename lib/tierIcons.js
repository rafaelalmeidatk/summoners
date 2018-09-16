export const getTierIcon = (tier, rank) => {
  if (!tier || !rank) {
    return `./static/img/tier_list/base_icons/provisional.png`
  }
  return `./static/img/tier_list/tier_icons/${tier.toLowerCase()}_${rank.toLowerCase()}.png`
}
