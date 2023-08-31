let currentPokemon;
let loadedPokemonName = [];
let loadedPokemonImg = [];
let trait1 = [];
let trait2 = [];

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

          const firstType = currentPokemon['types'][0]['type']['name'];
          console.log("Erster Typ:", firstType); // Eigenschaften der Pokemons

          if (currentPokemon['types'].length > 1) {
               // Zugriff auf den zweiten Typ
               const secondType = currentPokemon['types'][1]['type']['name'];
               trait2.push(secondType)
             } else {
               trait2.push(null);
             }
     }

}
function renderPokemon() {
     for (let i = 0; i < loadedPokemonName.length; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          let currentTrait1 = trait1[i];
          let currentTrait2 = trait2[i]
          document.getElementById('show-pokemon').innerHTML += /*html*/`
               <div class="pokemon-container" id="pokemon-container${i}"> <h3>${currentPokemonName}</h3>
                 <div class="imgAndTrait">
                  <img src="${currentPokemonImg}" id="poke-img">
                  <span class="traits" id="traits">${currentTrait1}</span>
                  ${currentTrait2 !== null ? `<span class="traits" id="secondTrait">${currentTrait2}</span>` : ''} 
                 </div>
               </div>    `;

          setBackgroundColor(i, currentTrait1);


     }
}

function setBackgroundColor(i, currentTrait1) {
     const backgroundColors = {
          'fire': 'red', 'normal': 'grey', 'water': 'blue', 'grass': 'green',
          'bug': 'darkgreen', 'poison': 'purple', 'electric': 'yellow', 'ground': 'brown',
          'fairy': 'rgb(234, 75, 157)', 'fighting': 'rgb(90, 5, 5)', 'rock': 'rgb(50, 43, 43)',
          'psychic': 'rgb(122, 113, 113)', 'ghost': 'rgb(174, 140, 255)', 'ice': 'rgb(186, 242, 239)',
          'dragon': 'rgb(255, 214, 139)'
      };

     const backgroundColor = backgroundColors[currentTrait1];
     if (backgroundColor) {
          document.getElementById(`pokemon-container${i}`).style.backgroundColor = backgroundColor;
     }
}

function setTraitColor(){
     
}