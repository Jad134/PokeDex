let currentPokemon;
let loadedPokemonName = [];
let loadedPokemonImg = [];
let trait1 = [];
let trait2 = [];

let startAmount = 1;


async function init() {
     await loadPokemon();

}



async function loadPokemon() {

     for (let i = startAmount; i < startAmount + 20; i++) {
          let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          let response = await fetch(url);
          let currentPokemon = await response.json();
          loadedPokemonName.push(currentPokemon['name'])
          loadedPokemonImg.push(currentPokemon['sprites']['other']['dream_world']['front_default'])
          trait1.push(currentPokemon['types']['0']['type']['name'])

          const firstType = currentPokemon['types'][0]['type']['name'];
          // console.log("Erster Typ:", firstType); // Eigenschaften der Pokemons

          if (currentPokemon['types'].length > 1) {
               // Zugriff auf den zweiten Typ
               const secondType = currentPokemon['types'][1]['type']['name'];
               trait2.push(secondType)
          } else {
               trait2.push(null);
          }
     }

     FirstLetterUpperCase()
     renderPokemon();
}

async function loadMore() { // WICHTIG! Reihenfolge beachten. Erst startAmount und dann loadPokemon()
     startAmount += 20;
     await loadPokemon()

}


function FirstLetterUpperCase() { // Anfangsbuchstaben der Pokemon gross schreiben.
     for (var i = 0; i < loadedPokemonName.length; i++) {
          loadedPokemonName[i] = loadedPokemonName[i].charAt(0).toUpperCase() + loadedPokemonName[i].substr(1);
     }

}


async function renderPokemon() {
     for (let i = startAmount - 1; i < startAmount + 18; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          let currentTrait1 = trait1[i];
          let currentTrait2 = trait2[i];


          document.getElementById('show-pokemon').innerHTML += /*html*/`
<div class="flip-card">
    <div class="flip-card-inner">
        <div class="pokemon-container flip-card-front " id="pokemon-container${i}">
            <h3>${currentPokemonName}</h3>
            <div class="imgAndTrait">
                <img src="${currentPokemonImg}" id="poke-img">
                <span class="traits" id="traits${i}">${currentTrait1}</span>
                ${currentTrait2 !== null ? `<span class="traits" id="secondTrait${i}">${currentTrait2}</span>` : ''}

            </div>

        </div>
        <div class="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
        </div>

    </div>
</div>
          
               `;

          setBackgroundColor(i, currentTrait1);
          setFirstTraitColor(i, currentTrait1);
          setSecondTraitColor(i, currentTrait2);



     }
     console.log(loadedPokemonName);
     console.log(loadedPokemonImg);
     console.log(trait1);
     console.log(trait2);
}




function setBackgroundColor(i, currentTrait1) {
     const backgroundColors = {
          'fire': 'red', 'normal': 'grey', 'water': 'blue', 'grass': 'green',
          'bug': 'darkgreen', 'poison': 'purple', 'electric': 'rgb(230, 247, 124)', 'ground': 'brown',
          'fairy': 'rgb(234, 75, 157)', 'fighting': 'rgb(90, 5, 5)', 'rock': 'rgb(50, 43, 43)',
          'psychic': 'rgb(122, 113, 113)', 'ghost': 'rgb(174, 140, 255)', 'ice': 'rgb(186, 242, 239)',
          'dragon': 'rgb(255, 214, 139)'
     };

     const backgroundColor = backgroundColors[currentTrait1];
     if (backgroundColor) {
          document.getElementById(`pokemon-container${i}`).style.backgroundColor = backgroundColor;
     }
}

function setFirstTraitColor(i, currentTrait1) {
     const backgroundColors = {
          'fire': 'rgb(242, 56, 56)', 'normal': 'rgb(94, 92, 92)', 'water': 'rgb(53, 75, 242)', 'grass': 'rgb(48, 240, 67)',
          'bug': 'rgb(37, 125, 25)', 'poison': 'rgb(142, 49, 235)', 'electric': 'yellow', 'ground': 'rgb(145, 76, 10)',
          'fairy': 'rgb(232, 60, 203)', 'fighting': 'rgb(227, 32, 64)', 'rock': 'rgb(52, 54, 40)',
          'psychic': 'rgb(137, 153, 17)', 'ghost': 'rgb(189, 166, 157)', 'ice': 'rgb(71, 252, 255)',
          'dragon': 'rgb(237, 142, 33)'
     };
     let backgroundColor = backgroundColors[currentTrait1];
     if (backgroundColor) {
          document.getElementById(`traits${i}`).style.backgroundColor = backgroundColor;
     }
}
function setSecondTraitColor(i, currentTrait2) {
     const backgroundColors = {
          'flying': 'rgb(50, 228, 237)', 'poison': 'rgb(142, 49, 235)', 'ground': 'rgb(145, 76, 10)', 'fairy': 'rgb(232, 60, 203)', 'ice': 'rgb(71, 252, 255)'
     }
     let backgroundColor = backgroundColors[currentTrait2];
     if (backgroundColor) {
          document.getElementById(`secondTrait${i}`).style.backgroundColor = backgroundColor;
     }
}




