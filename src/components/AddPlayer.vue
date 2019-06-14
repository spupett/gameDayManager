<template>
  <div class="container">
    <h1>Add a user</h1>
    <form>
      <div class="form-row">
        <div id="bggName">
          <label class="form-control-label" for="bggName">BGG Name</label>
          <input name="bggName" type="text" v-model="bggName" class="form-control form-control-warning"  v-bind:class="{ 'is-invalid': attemptSubmit && missingBggName}"/>
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div id="firstName">
          <label class="form-control-label" for="firstName">First Name</label>
          <input name="firstName" type="text" v-model="firstName" class="form-control form-control-warning" v-bind:class="{ 'is-invalid': attemptSubmit && missingFirstName}" />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div id="lastName">
          <label class="form-control-label" for="lastName">Last Name</label>
          <input name="lastName" type="text" v-model="lastName" class="form-control form-control-warning" v-bind:class="{ 'is-invalid': attemptSubmit && missingLastName}" />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div id="email">
          <label class="form-control-label" for="email">Email</label>
          <input name="email" type="text" v-model="email" class="form-control form-control-warning"  v-bind:class="{ 'is-invalid': attemptSubmit && (missingEmail || badEmail)}" />
          <div class="invalid-feedback">This field is required.</div>
        </div>
      </div>
      <button v-on:click="validateForm">Add Person</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const fetch = process.env.FETCH_FROM;

export default {
  name: 'addPlayer',
  data() {
    return {
      bggName: '',
      firstName: '',
      lastName: '',
      email: '',
      attemptSubmit: false
    }
  },
  methods: { 
    validateForm(event) {
      this.attemptSubmit = true;
      if(this.missingEmail || this.missingBggName || this.missingFirstName || this.missingLastName || this.badEmail) {
        event.preventDefault();
      }
      this.submitPerson().then((results) => {
        if(results === null) {
          this.bggName = '';
        }
      });
    },
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
        return results.data;
      })
    }
  },
  computed: { 
    missingBggName() {
      return this.bggName === '';
    },
    missingFirstName() {
      return this.firstName === '';
    },
    missingLastName() {
      return this.lastName === '';
    },
    missingEmail() {
      return this.email === '';
    },
    badEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(this.email);
    }
  }
}
</script>
