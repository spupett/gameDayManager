<template>
  <div>
    <div id="name">
      <label for="users">Comma seperated users</label>
      <input type="text" name="users" id="users" v-model="userList"> <br />
      <label for="bestAt">Number of players</label>
      <input type="number" name="bestAt" id="bestAt" v-model="numberOfUsers"> <br />
      <button v-on:click="showGames()">Get Game List</button>
      <span>Total Games: {{ games.length }}</span>
      <span>Filtered Games: {{ showFilteredGames.length }}</span>
      <div id="player-filter">
        <label for="player-filter">Filter by player count</label>
        <input type="checkbox" v-bind:checked="playerCountFilter" />
      </div>
      <mechanisms-filter v-bind:games="this.games" />
      <div class="games" 
        v-bind:key=game.bggId        
        v-for="game in showFilteredGames">
        <game v-bind:game="game" />
      </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import "babel-polyfill";
import mechanismsFilter from './AvailableMechanisms.vue';
import game from './Game.vue';

import { EventBus } from '../event-bus.js';

export default {
  components: {
    mechanismsFilter,
    game,
  },
  name: 'gameData',
  data () {
    return {
      userList: 'spuppett, HKImpact',
      userNames: [],
      games: [],
      gameIDs: [],
      activeMechanisms: [],
      numberOfUsers: 0,
      playerCountFilter: false
    }
  },
  methods: {
    async showGames() {
      this.userNames = userNames(this.userList);
      this.gamesIDs = await allGameIDs(this.userNames);
      this.games = await getGameDetails(this.gamesIDs);
      this.numberOfUsers = this.userNames.length;
    }    
  },
  computed: {
    sortedGames() {
      return showBestAtFirst(this.numberOfUsers, [...this.games].sort(compareGameNames));
    },
    showFilteredGames() {
      const filters = [
        {
          mechanism: (games) => {
            if(this.activeMechanisms.length === 0) { return [] }
                  
            const filteredGames = [];
            games.forEach((game) => {
              if(game.mechanics.some((mechanic) => { return(this.activeMechanisms.includes(mechanic)); })) {
                  filteredGames.push(game);
                }
            })
            return filteredGames;
          }
        }
      ];
      
      return showBestAtFirst(this.numberOfUsers, [...filterGames(this.sortedGames, filters)].sort(compareGameNames));
    }
  },
  created() {
    EventBus.$on('mechanism-filter-change', (activeMechanisms) => {
      this.activeMechanisms = activeMechanisms;
    })
  }
};

function filterGames(games, filters) {
  let filteredGames = games;
  filters.forEach((filter) => {
    const filterName = Object.keys(filter)[0];
    filteredGames = (filter[filterName](filteredGames));
  })
  return filteredGames;
}

function showBestAtFirst(number, games) {
  const bestAt = [];
  const others = [];
  games.forEach((game, idx) => {
    if(Number(game.playerCount.best) === Number(number) ) {
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



<style lang="css">

</style>
