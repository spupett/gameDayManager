<template>  
  <div id="mechanisms-box">
    <h3 class="title">Available Mechanisms</h3>
    <div class="btn-primary mechanism-tag" 
      v-on:click="toggleActive(mechanism)" 
      v-bind:key="mechanism" v-for="mechanism in allMechanisms" 
      v-bind:class="{ 
        'active' : activeMechanisms.indexOf(mechanism) !== -1,
        'inactive' : activeMechanisms.indexOf(mechanism) === -1 }">{{ mechanism }}</div>
  </div>
</template>

<script>

import Games from './GameInfo';

export default {
  name: "mechanisms",
  props: ['games'],
  data() {
    return {
      activeMechanisms: {}
    }
  },
  methods: {
    toggleActive(mechanism) {
      const idx = this.activeMechanisms.indexOf(mechanism);
      idx !== -1 ? this.activeMechanisms.splice(idx, 1) : this.activeMechanisms.push(mechanism);
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
      this.activeMechanisms = JSON.parse(JSON.stringify(uniqeMechanisms));
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