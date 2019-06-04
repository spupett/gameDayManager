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

<style>
  .mechanism-tag {
    display: inline-block;
    border-radius: 6px;
    margin: 3px 5px 3px;
    padding: 0px 4px;
    cursor: default;
  }

  .category-tag {
    display: inline-block;
    border-radius: 6px;
    margin: 3px 5px 3px;
    padding: 0px 4px;
    cursor: default;
  }
</style>
