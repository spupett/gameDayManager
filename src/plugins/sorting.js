export default {
  install (Vue, options) {
    Vue.prototype.$sortByGameName = (games) => {
      return games.sort(compareGameNames)
    }
  }
}

const compareGameNames = (g1, g2) => {
  const g1Name = g1.name.toUpperCase()
  const g2Name = g2.name.toUpperCase()
  return (g1Name > g2Name) ? 1 : (g1Name < g2Name) ? -1 : 0
}
