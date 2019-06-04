import Vue from 'vue'
import Router from 'vue-router'
import GameList from '../components/GameInfo.vue'
import Junk from '../components/junk.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: GameList
    },
    {
      path: '/addPlayer',
      name: 'AddPlayer',
      component: Junk
    },
    {
      path: '/createGroup',
      name: 'Create Group',
      component: GameList
    }
  ]
})
