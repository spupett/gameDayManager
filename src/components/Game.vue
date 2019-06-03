<template>
  <div class="game">
    <h5>{{ game.name }}</h5>
    <div class="game-image">
      <img v-bind:src="game.thumbnail" />    
    </div>
    <div class="game-info">
      <div>Minimum Players: {{ game.playerCount.min }}</div>
      <div>Maximum Players: {{ game.playerCount.max }}</div>
      <div>Best At: {{ game.playerCount.best }}</div>
      <div>Mechanisms: {{ game.mechanics }}</div>
      <div>Categories: {{ game.category }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['game']
}
</script>

<style scoped>
  .game {
    padding-bottom: 35px;
  }

  .game .game-image {
    width: 250px;
    display: inline-block;
  }

  .game img {
    padding-right: 20px;
    vertical-align: top;
  }

  .game .game-info {
    display: inline-block;
    vertical-align: top;
  }
</style>
