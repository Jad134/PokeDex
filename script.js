let currentPokemon;
let loadedPokemonName = [];
let loadedPokemonImg = [];
let trait1 = [];

async function init() {
     await loadPokemon();
     renderPokemon();
}

async function loadPokemon() {
     for (i = 1; i < 180; i++) {
          let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          let response = await fetch(url);
          let currentPokemon = await response.json();
          loadedPokemonName.push(currentPokemon['name'])
          loadedPokemonImg.push(currentPokemon['sprites']['front_shiny'])
          trait1.push(currentPokemon['types']['0']['type']['name'])
          console.log(currentPokemon['types']['0']['type']['name']) // Eigenschaften der Pokemons
     }

}
function renderPokemon() {
     for (let i = 0; i < loadedPokemonName.length; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          document.getElementById('show-pokemon').innerHTML += /*html*/`
               <div id="pokemon-container"> <h3>${currentPokemonName}</h3>
               <img src="${currentPokemonImg}" id="poke-img">
               <span id="traits">${trait1[i]}</span>
               </div>    `;

     }
}