export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPercent(rate, decimal) {
  return rate === 0 ? '--' : (rate*100).toFixed(decimal) + "%"
}