<template>  
  <div id="mechanics-box">
    <h3 class="title">Available Mechanics</h3>
    <div class="btn-primary mechanic-tag" v-bind:key="f" v-for="f in g">{{ f }}</div>
  </div>
</template>

<script>

import Games from './GameInfo';

export default {
  name: "mechanics",
  props: ['games'],
  data() {
    return {}
  },
  methods: {},
  computed: {
    g() {
      const mechanics = this.games.reduce((acc, game) => {
        game.mechanics.forEach((mechanic) => {
          acc.push(mechanic);
        });
        return acc;
      }, [])
      return Array.from(new Set(mechanics).values()).sort();
    }
  },
}
</script>

<style lang="css" scoped>
  #mechanics-box {
    width: 95%;
    margin: auto;
    overflow-wrap: break-word;
  }

  #mechanics-box .mechanic-tag {
    display: inline-block;
    border-radius: 6px;
    margin: 3px 5px 3px;
    padding: 0px 4px;
  }

  #mechanics-box .mechanic-tag::after {
    content: "\D7";
    color: white;
    padding-left: 8px;
  }
</style>