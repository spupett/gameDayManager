<template>
  <div>
    <h1>Game Day Manager</h1>
    <gameData></gameData>
  </div>
</template>

<script>

import Games from './components/GameInfo.vue'

export default {
  components: {
    'gameData': Games
  },
  data () {
    return {
    }
  }
}
</script>
