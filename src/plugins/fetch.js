
import axios from 'axios';

export default {
  install (Vue, options) {
    Vue.prototype.$fetch = (url, method, done) => {
      document.body.classList.add('fetching')
      return axios({
        method: method,
        'url': url
      }).then((results) => {
        document.body.classList.remove('fetching')
        done(results)
      })
    }
  }
}
