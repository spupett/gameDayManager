<template>  
  <div id="mechanics-box">
    <h3 class="title">Available Mechanics</h3>
    <div class="btn-primary mechanic-tag" 
      v-on:click="toggleActive(mechanic)" 
      v-bind:key="mechanic" v-for="mechanic in allMechanics" 
      v-bind:class="{ 
        'active' : activeMechanics.indexOf(mechanic) !== -1,
        'inactive' : activeMechanics.indexOf(mechanic) === -1 }">{{ mechanic }}</div>
  </div>
</template>

<script>

import Games from './GameInfo';

export default {
  name: "mechanics",
  props: ['games'],
  data() {
    return {
      activeMechanics: {}
    }
  },
  methods: {
    toggleActive(mechanic) {
      const idx = this.activeMechanics.indexOf(mechanic);
      idx !== -1 ? this.activeMechanics.splice(idx, 1) : this.activeMechanics.push(mechanic);
    }
  },
  computed: {
    allMechanics() {
      const mechanics = this.games.reduce((acc, game) => {
        game.mechanics.forEach((mechanic) => {
          acc.push(mechanic);
        });
        return acc;
      }, [])
      const uniqeMechanics = Array.from(new Set(mechanics).values()).sort();
      this.activeMechanics = JSON.parse(JSON.stringify(uniqeMechanics));
      return uniqeMechanics;
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
    cursor: default;
  }

  #mechanics-box .mechanic-tag.inactive {
    background-color: crimson;
  }

  #mechanics-box .mechanic-tag.active::after {
    content: "\D7";
    color: white;
    padding-left: 8px;
  }  

  #mechanics-box .mechanic-tag.inactive::after {
    content: "+";
    color: white;
    padding-left: 8px;
  }

</style>