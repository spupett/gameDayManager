<template>
  <div>
    List of Players in the group:
    <div class="btn-group-vertical">
      <div class="users"
        v-bind:key=user.bggName
        v-for="user in users">
          <button class="btn btn-secondary" v-on:click="toggleAvailablePlayer(user.bggName)">{{ user.bggName }} </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js'

export default {
  name: 'player-list',
  data() {
    return {}
  },
  methods: { 
    toggleAvailablePlayer(player) {
      EventBus.$emit('player-toggled', player);
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
  .users {
    padding: 2px 0;
  }
</style>

