<template>
  <div>
    Game List
    <div class="games" 
      v-bind:key=game.bggId        
      v-for="game in this.games">
      <game v-bind:game="game" />
    </div>
  </div>
</template>

<script>
import game from './Game.vue';

export default {
  name: 'GameList',
  components: {
    game,
  },
  props: {
    gameData: Array
  },
  data() {
    return { 
      games: this.gameData
    }
  },
  methods: { },
  computed: { },
  watch: {
    gameData(newValue) {
      this.games = this.gameData;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
