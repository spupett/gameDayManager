import axios from 'axios'

const fetch = process.env.FETCH_FROM

export default {
  install (Vue, options) {
    Vue.prototype.$fetchFromGGM = async (url, method, done, data) => {
      document.body.classList.add('fetching')
      if (method === 'GET') {
        return get(`${fetch}/${url}/`)
          .then((results) => {
            document.body.classList.remove('fetching')
            return done(results)
          })
      } else if (method === 'POST') {
        return post(`${fetch}/${url}/`, data)
          .then((results) => {
            document.body.classList.remove('fetching')
            return done(results)
          })
      }
    }
  }
}

const get = (url) => {
  return axios.get(url)
}

const post = (url, data) => {
  return axios.post(url, data)
}
