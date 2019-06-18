<template>
  <div>
    <div class="users"
      v-bind:key=user.bggName
      v-for="user in users">
        <div>
          <button v-on:click="getUserGames(user.bggName)" class="btn btn-success">{{ user.bggName }}</button>
        </div>
    </div>
    <game-list v-bind:game-data="this.games" style="float: right" />
  </div>
</template>

<script>

import gameList from './GameList.vue'

export default {
  name: 'userList',
  components: {
    gameList
  },
  data() {
    return {
      games: []
    }
  },
  methods: { 
    async getUserGames(name) {
      const gameIds = (await this.$fetchFromGGM(`api/v1/users/${name}/games`, 'GET', (f) => { return f.data })).map(g => g.id)
      const games = await this.$fetchFromGGM(`api/v1/games`, 'POST', (f) => { return f.data }, 
        { 
          gameList: JSON.stringify(gameIds)
        })
      this.games = this.$sortByGameName(games);
    }
  },
  computed: { },
  asyncComputed: {
    async users() {
      return await this.$fetchFromGGM('api/v1/users/', 'GET', (f) => { return f.data } )
    }
  }
}

</script>
