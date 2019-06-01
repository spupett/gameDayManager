<template>  
  <div id="mechanisms-box">
    <h3 class="title">Available Mechanisms</h3>
    <div class="btn-primary mechanism-tag" 
      v-on:click="toggleActive(mechanism)" 
      v-bind:key="mechanism" v-for="mechanism in allMechanisms" 
      v-bind:class="{ 
        'active' : inactiveMechanisms.indexOf(mechanism) === -1,
        'inactive' : inactiveMechanisms.indexOf(mechanism) !== -1 }">{{ mechanism }}</div>
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
      inactiveMechanisms: []
    }
  },
  methods: {
    toggleActive(mechanism) {
      const idx = this.inactiveMechanisms.indexOf(mechanism);
      idx !== -1 ? this.inactiveMechanisms.splice(idx, 1) : this.inactiveMechanisms.push(mechanism);
      EventBus.$emit('mechanism-filter-change', this.inactiveMechanisms);
    }
  },
  computed: {
    allMechanisms() {
      const mechanisms = this.games.reduce((acc, game) => {
        game.mechanics.forEach((mechanism) => {
          acc.push(mechanism);
        });
        return acc;
      }, [])
      const uniqeMechanisms = Array.from(new Set(mechanisms).values()).sort();
      this.inactiveMechanisms = [];
      return uniqeMechanisms;
    }
  },
}
</script>

<style lang="css" scoped>
  #mechanisms-box {
    width: 95%;
    margin: auto;
    overflow-wrap: break-word;
  }

  #mechanisms-box .mechanism-tag {
    display: inline-block;
    border-radius: 6px;
    margin: 3px 5px 3px;
    padding: 0px 4px;
    cursor: default;
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