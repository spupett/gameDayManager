import Vue from 'vue'
import Router from 'vue-router'
import GameList from '../components/GameInfo.vue'
import AddPlayer from '../components/AddPlayer.vue'
import UserList from '../components/UserList.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: GameList
        },
        {
            path: '/AddPlayer',
            name: 'Add Player',
            component: AddPlayer
        },
        {
            path: '/createGroup',
            name: 'Create Group',
            component: GameList
        },
        {
            path: '/userList',
            name: 'Player List',
            component: UserList
        }
    ]
})