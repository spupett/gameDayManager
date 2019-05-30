<template>  
  <div id="mechanics-box">
    <span class="btn-primary mechanic-tag" v-bind:key="f" v-for="f in g">{{ f }}</span>
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

<style lang="scss" scoped>
  
</style>