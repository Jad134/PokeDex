let currentPokemon;
let loadedPokemonName = [];
let loadedPokemonImg = [];
let trait1 = [];

async function init() {
     await loadPokemon();
     renderPokemon();
}

async function loadPokemon() {
     for (i = 1; i < 181; i++) {
          let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          let response = await fetch(url);
          let currentPokemon = await response.json();
          loadedPokemonName.push(currentPokemon['name'])
          loadedPokemonImg.push(currentPokemon['sprites']['other']['dream_world']['front_default'])
          trait1.push(currentPokemon['types']['0']['type']['name'])
          console.log(currentPokemon['types']['0']['type']['name']) // Eigenschaften der Pokemons
     }

}
function renderPokemon() {
     for (let i = 0; i < loadedPokemonName.length; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          let currentTrait1 = trait1[i];
          document.getElementById('show-pokemon').innerHTML += /*html*/`
               <div class="pokemon-container" id="pokemon-container${i}"> <h3>${currentPokemonName}</h3>
                 <div class="imgAndTrait">
                  <img src="${currentPokemonImg}" id="poke-img">
                  <span id="traits">${currentTrait1}</span>
                 </div>
               </div>    `;
          
          if (currentTrait1 == 'fire') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'red';

          }
          if (currentTrait1 == 'normal') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'grey';

          }
          if (currentTrait1 == 'normal') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'grey';

          }
          if (currentTrait1 == 'water') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'blue';

          }
          if (currentTrait1 == 'grass') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'green';

          }
          if (currentTrait1 == 'bug') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'darkgreen';

          }
          if (currentTrait1 == 'poison') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'purple';

          }if (currentTrait1 == 'electric' ) {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'yellow';

          }
          if (currentTrait1 == 'ground') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'brown';

          }
          if (currentTrait1 == 'fairy') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(234, 75, 157)';

          }
          if (currentTrait1 == 'fighting') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(90, 5, 5)';

          }
          if (currentTrait1 == 'rock') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(50, 43, 43)';

          }
          if (currentTrait1 == 'psychic') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(122, 113, 113)';

          }if (currentTrait1 == 'ghost') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(174,140,255)';

          }
          if (currentTrait1 == 'ice') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(186,242,239)';

          }
          if (currentTrait1 == 'dragon') {
               document.getElementById(`pokemon-container${i}`).style.backgroundColor = 'rgb(255,214,139)';

          }

     }
}