<template>
  <div class="container">
    <div id="name">
      <player-list />

      <label for="users">Comma seperated users:</label>
      <label for="bestAt">{{ userList }}</label> <br />
      <input type="number" name="bestAt" id="bestAt" v-model="playerCount"> <br />
      <button v-on:click="showGames()">Get Game List</button>
      <span>Total Games: {{ games.length }}</span>
      <span>Filtered Games: {{ showFilteredGames.length }}</span>
      <div id="player-filter">
        <label for="player-filter">Filter by player count</label>
        <input type="checkbox" name="player-filter" v-bind:checked="playerCountFilter" v-model="playerCountFilter" />
      </div>
      <div id="expansion-filter">
        <label for="expansion-filter">Discard Expansions</label>
        <input type="checkbox" name="expansion-filter" v-bind:checked="expansionFilter" v-model="expansionFilter" />
      </div>
      <mechanisms-filter v-bind:games="this.games" />
      <game-list v-bind:game-data="showFilteredGames" />
    </div> 
  </div>
</template>

<script>
import "babel-polyfill";
import mechanismsFilter from './AvailableMechanisms.vue';
import playerList from './PlayerList';
import gameList from './GameList';
import { EventBus } from '../event-bus.js';

export default {
  components: {
    mechanismsFilter,
    playerList,
    gameList
  },
  name: 'gameData',
  data () {
    return {
      playerNames: [],
      games: [],
      gameIDs: [],
      activeMechanisms: [],
      playerCountFilter: false,
      expansionFilter: false
    }
  },
  methods: {
    async showGames() {
      this.playerNames = playerNames(this.userList);
      this.gamesIDs = await this.allGameIDs(this.playerNames);
      this.games = await this.getGameDetails(this.gamesIDs);
      this.numberOfPlayers = this.playerNames.length;
    },
    async allGameIDs(names) {
      const allGameIDs = await Promise.all(names.map((name) => {
          return this.getUsersGameList(name).then((res) => {
              return res.map((game) => { return game.id; });      
            });
        }));
        const combined = allGameIDs.reduce((acc, list) => {
          return acc.concat(list);
        }, [])
        //get rid of duplicates
        return dedupArray(combined);
    },
    async getUsersGameList(name) {
      return await this.$fetchFromGGM(`api/v1/users/${name}/games`, 'GET', (f) => { return f.data } );
    },
    async getGameDetails(games) {
      return await this.$fetchFromGGM(`api/v1/games`, 'POST', (f) => { return f.data }, { gameList: JSON.stringify(games)} )
    }
  },
  computed: {
    sortedGames() {
      return showBestAtFirst(this.numberOfPlayers, [...this.games].sort(compareGameNames));
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
            });
            return filteredGames;
          }
        },
        {
          playerCount: (games) => {
            const filteredGames = [];
            if(this.playerCountFilter) {
              games.forEach((game) => {
                if(Number(game.playerCount.min) <= Number(this.numberOfPlayers) && Number(game.playerCount.max) >= Number(this.numberOfPlayers)) {
                  filteredGames.push(game);
                }
              });
              return filteredGames;
            }
            else {
              return games;
            }
          }
        },
        {
          expansion: (games) => {
            const filteredGames = [];
            if(this.expansionFilter) {
              games.forEach((game) => {
                if(!game.category.includes('Expansion for Base-game')) {
                  filteredGames.push(game);
                }
              });
              return filteredGames
            }
            else {
              return games;
            }
          }
        }];
      
      return showBestAtFirst(this.numberOfPlayers, [...filterGames(this.sortedGames, filters)].sort(compareGameNames));
    },
    userList() {
      return this.playerNames.join(',');
    },
    playerCount() {
      return this.playerNames.length;
    }
  },
  created() {
    EventBus.$on('mechanism-filter-change', (activeMechanisms) => {
      this.activeMechanisms = activeMechanisms;
    }),
    EventBus.$on('player-toggled', (player) => {
      this.playerNames = updateList(this.playerNames, player)
    })
  }
};

function updateList(list, item) {
  if(list.indexOf(item) !== -1) {
    const idx = list.indexOf(item);
    list.splice(idx, 1);
    return list;
  }
  list.push(item);
  return list;
}

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
function playerNames(names) { 
  return names.split(',').map((name) => name.trim()); 
}

function dedupArray(arr) {
  return Array.from(new Set(arr).values());
}
</script>