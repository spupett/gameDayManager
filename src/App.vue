<template>
  <div>
    <h1>Game Day Manager</h1>
    <router-link to="addPlayer">Add Player</router-link>
    <router-link to="/">Get Group Games</router-link>
    <router-link to="createGroup">Create Group</router-link>
    <router-view /> <!-- replaced with whatever component the router is at -->
  </div>
</template>

<script>


export default {
  data () {
    return {
    }
  }
}
</script>
