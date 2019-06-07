<template>  
  <div id="mechanisms-box">
    <h3 class="title">Available Mechanisms</h3>
    <div class="btn-primary mechanism-tag" 
      v-on:click="toggleActive(mechanism)" 
      v-bind:key="mechanism" v-for="mechanism in this.allMechanisms" 
      v-bind:class="{ 
        'active' : activeMechanisms.indexOf(mechanism) !== -1,
        'inactive' : activeMechanisms.indexOf(mechanism) === -1 }">{{ mechanism }}</div>
  </div>
</template>

<script>

import Games from './GameInfo';
import { EventBus } from '../event-bus.js'

export default {
  name: "mechanisms",
  props: ['games'],
  data() {
    return {
      allMechanisms: [],
      activeMechanisms: [],
      gameList: [],
    }
  },
  methods: {
    toggleActive(mechanism) {
      const idx = this.activeMechanisms.indexOf(mechanism);
      idx !== -1 ? this.activeMechanisms.splice(idx, 1) : this.activeMechanisms.push(mechanism);
      EventBus.$emit('mechanism-filter-change', this.activeMechanisms);
    }
  },
  watch: {
    games(newValue) {
      const mechanisms = this.games.reduce((acc, game) => {
        game.mechanics.forEach((mechanism) => {
          acc.push(mechanism);
        });
        return acc;
      }, [])
      const uniqeMechanisms = Array.from(new Set(mechanisms).values()).sort();
      this.allMechanisms = JSON.parse(JSON.stringify(uniqeMechanisms));
      EventBus.$emit('mechanism-filter-change', []);
    }
  },
  mounted() {
    
  },
}
</script>

<style lang="scss" scoped>
  #mechanisms-box {
    width: 95%;
    margin: auto;
    overflow-wrap: break-word;
  }

  #mechanisms-box .mechanism-tag.inactive {
    background-color: crimson;
  }

  #mechanisms-box .mechanism-tag.active::after {
    content: "\D7";
    color: white;
    padding-left: 8px;
  }  

  #mechanisms-box .mechanism-tag.inactive::after {
    content: "+";
    color: white;
    padding-left: 8px;
  }

</style>