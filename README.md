# gamedaymanager

> Make Selecting a game to play easier.  

The idea of this program is that you select the players and get the games they have in BGG.  Then select the number of players if different than the number of players selected.

By default all mechanisms are turned off, as indicated by being red.  Toggling to blue, will show games that use that mechanism.  Each mechanism is additive, meaning that there is an 'or' between each selected (blue) mechanism (eg Storytelling or Worker Placement or Set Collection).

Games are sorted alphabetical, with the exception that games that are 'Best At' the number of players are listed first.

Other filters

- Filter by player count - Only show games that are playable by the number of players
- Filter out expansions - Do not show expansions in the list of games.

## Build Setup

``` bash
# install dependencies
npm install vue-cli -g
npm install firebase-tools -g
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
firebase deploy #to deploy to firebase
```

 Need a .firebaserc file and firebase.json
