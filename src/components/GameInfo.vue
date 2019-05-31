<template>
  <div>
    <div id="name">
      <label for="users">Comma seperated users</label>
      <input type="text" name="users" id="users" v-model="userList">
      <button v-on:click="showGames()">Get User</button>
      <mechanics-filter v-bind:games="sortedGames" />
      <div id="games" v-bind:key=game.bggId v-for="game in sortedGames">
        <img v-bind:src="game.thumbnail" />
        <div  style="display: inline-block">
        <h5>{{ game.name }}</h5>
        Min: {{ game.playerCount.min }} <br />
        Max: {{ game.playerCount.max }} <br />
        Best at: {{ game.playerCount.best }} <br />
        {{ game.mechanics }} <br />
        {{ game.category }}
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "babel-polyfill";
import MechanicsFilter from './AvailableMechanics.vue';

export default {
  components: {
    MechanicsFilter,
  },
  name: 'gameData',
  data () {
    return {
      userList: 'spuppett, HKImpact',
      userNames: [],
      games: [],
      gameIDs: []
    }
  },
  methods: {
    async showGames() {
      this.userNames = userNames(this.userList);
      this.gamesIDs = await allGameIDs(this.userNames);
      this.games = await getGameDetails(this.gamesIDs);
    }
  },
  computed: {
    sortedGames() {
      return showBestAtFirst(this.userNames.length, [...this.games].sort(compareGameNames));
    }
  }
};

function showBestAtFirst(number, games) {
  const bestAt = [];
  const others = [];
  games.forEach((game, idx) => {
    if(Number(game.playerCount.best) === number ) {
      bestAt.push(game);
    }
    else {
      others.push(game);
    }
  });

  return bestAt.concat(others);
}

function compareGameNames(g1, g2) {
  const g1Name = g1.name.toUpperCase();
  const g2Name = g2.name.toUpperCase();

  return (g1Name > g2Name) ? 1 : (g1Name < g2Name) ? -1 : 0;
}

function userNames(names) { 
  return names.split(',').map((name) => name.trim()); 
}

async function getUsersGameList(name) {
   return axios({
      method: "GET",
      "url": `http://localhost:3000/api/v1/users/${name}/games`
    }).then((results) => {
      return results.data;
    })
}

async function allGameIDs(names) {
  const allGameIDs = await Promise.all(names.map((name) => {
    return getUsersGameList(name).then((res) => {
        return res.map((game) => { return game.id; });      
      });
  }));

  const combined = allGameIDs.reduce((acc, list) => {
    return acc.concat(list);
  }, [])

  //get rid of duplicates
  return Array.from(new Set(combined).values());
}

async function getGameDetails(games) {
  return axios.get('http://localhost:3000/api/v1/games/', 
    {
      params: {
        gameIdList: JSON.stringify(games)
      }
    }).then((results) => { return results.data; })
}
</script>



<style lang="scss">

</style>
