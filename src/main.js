import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BootstrapVue from 'bootstrap-vue'
import router from './router'


Vue.use(BootstrapVue)
Vue.use(AsyncComputed)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
