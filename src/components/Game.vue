<template>
  <div class="game">
    <h5>{{ game.name }}</h5>
    <div class="game-image">
      <a v-bind:href="game.bggLink" target="_blank">
        <img v-bind:src="thumbnail" />
      </a>
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
  props: {
    game: Object
  },
  computed: {
    thumbnail() {
      if( this.game.thumbnail && this.game.thumbnail.length > 0 ) {
        return this.game.thumbnail
      } else {
        return 'https://fillmurray.com/g/150/150'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
