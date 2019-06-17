import axios from 'axios'

const fetch = process.env.FETCH_FROM

export default {
  install (Vue, options) {
    Vue.prototype.$fetchFromGGM = async (url, method, done) => {
      document.body.classList.add('fetching')
      return axios({
        method: method,
        'url': `${fetch}/${url}/`
      }).then((results) => {
        document.body.classList.remove('fetching')
        return done(results)
      })
    }
  }
}
