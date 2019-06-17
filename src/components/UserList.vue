<template>
  <div>
    <div class="users"
      v-bind:key=user.bggName
      v-for="user in users">
        <div>{{ user.bggName }} </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userList',
  data() {
    return {}
  },
  methods: { },
  computed: { },
  asyncComputed: {
    async users() {
      return await this.$fetchFromGGM('api/v1/users/', 'GET', (f) => { return f.data } )
    }
  }
}

</script>


