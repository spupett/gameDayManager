<template>
  <div>
    List of Players in the group:
    <div class="btn-group">
      <div class="users"
        v-bind:key=user.bggName
        v-for="user in users">
          <button class="btn btn-secondary" v-bind:class="{ playing: activePlayers.indexOf(user.bggName) !== -1}" v-on:click="toggleAvailablePlayer(user.bggName)">{{ user.bggName }} </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js'

export default {
  name: 'player-list',
  data() {
    return {
      activePlayers: [],

    }
  },
  methods: { 
    toggleAvailablePlayer(player) {
      const idx = this.activePlayers.indexOf(player)
      if(idx === -1 ) {
        this.activePlayers.push(player)
      } else {
        this.activePlayers.splice(idx, 1);
      }
      EventBus.$emit('player-toggled', this.activePlayers);
    }
  },
  asyncComputed: {
    async users() {
      return await this.$fetchFromGGM('api/v1/users/', 'GET', (f) => { return f.data } )
    }
  }
}

</script>

<style lang="scss" scoped>
  .playing {
    background-color: green;
  }
  
  .users {
    padding: 0 2px;
  }
</style>

