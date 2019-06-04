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
      <div>Mechanisms: <div class="mechanism-tag" v-bind:key="mechanism" v-for="mechanism in game.mechanics">{{ mechanism }}</div></div>
      <div>Categories: <div class="category-tag" v-bind:key="cat" v-for="cat in game.category">{{ cat }}</div></div>
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

  .mechanism-tag{
    background-color: grey;
  }

  .category-tag{ 
    background-color: burlywood;
  }
</style>
