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
import axios from "axios";

const fetch = process.env.FETCH_FROM;

export default {
  name: 'userList',
  data() {
    return {}
  },
  methods: { },
  computed: { },
  asyncComputed: {
    async users() {
      const userList = await getUsers();
      return userList;
    }
  }
};

async function getUsers() {
  return axios({
    method: "GET",
    "url": `${fetch}/api/v1/users/`
  }).then((results) => {
    return results.data;
  })
}
</script>

<style lang="scss" scoped>

</style>


