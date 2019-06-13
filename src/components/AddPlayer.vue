<template>
  <div>
    <h1>Add a user</h1>
    <div id="bggName">
      <label for="bggName">BGG Name</label>
      <input name="bggName" type="text" v-model="bggName" />
    </div>
    <div id="firstName">
      <label for="firstName">First Name</label>
      <input name="firstName" type="text" v-model="firstName" />
    </div>
    <div id="lastName">
      <label for="lastName">Last Name</label>
      <input name="lastName" type="text" v-model="lastName" />
    </div>
    <div id="email">
      <label for="email">Email</label>
      <input name="email" type="text" v-model="email" />
    </div>
    <button v-on:click="submitPerson()">Add Person</button>
  </div>
</template>

<script>
import axios from "axios";

const fetch = process.env.FETCH_FROM;

export default {
  name: 'addPlayer',
  data() {
    return {
      bggName: 'webs05',
      firstName: 'Jon',
      lastName: 'Weber',
      email: 'asf@asdf.com'
    }
  },
  methods: { 
    async submitPerson() {
      return axios({
        method: "POST",
        "url": `${fetch}/api/v1/users/`,
        data: {
          "bggName": this.bggName,
          "firstName": this.firstName,
          "lastName": this.lastName,
          "email": this.email
        }
      }).then((results) => {
        console.log(results);
        return results;
      })
    }
  },
  computed: { }
}
</script>
