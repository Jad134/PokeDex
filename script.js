let currentPokemon;
let loadedPokemonName = [];
let loadedPokemonImg = [];
let trait1 = [];
let trait2 = [];
let pokeId = [];
let height = [];
let weight = [];
const pokemonStats = [];
let pokemonMoves = [];
let startAmount = 1;

async function init() {
     await loadPokemon();

}

async function loadPokemon() {
     loadingScreenOpen()
     
     for (let i = startAmount; i < startAmount + 40; i++) {
          let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          let response = await fetch(url);
          let currentPokemon = await response.json();

          searchStatsAndMoves(currentPokemon)
          pushPropetisToArray(currentPokemon)
     }
     loadingScreenEnd()
     FirstLetterUpperCase()
     renderPokemon();
}

function loadingScreenOpen(){
     document.getElementById('pokeball-loader').classList.add('d-flex');
     const loadMoreBtn = document.getElementById('load-more-btn');
     loadMoreBtn.disabled = true;
}

function loadingScreenEnd(){
     const loadMoreBtn = document.getElementById('load-more-btn');
     loadMoreBtn.disabled = false;
     document.getElementById('pokeball-loader').classList.remove('d-flex');
}

function searchStatsAndMoves(currentPokemon) {
     const stats = currentPokemon.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
     }));

     const moves = currentPokemon.moves.map(move => ({
          name: move.move.name
     }));
     pokemonMoves.push(moves);
     pokemonStats.push(stats);
}

function pushPropetisToArray(currentPokemon) {
     loadedPokemonName.push(currentPokemon['name'])
     loadedPokemonImg.push(currentPokemon['sprites']['other']['dream_world']['front_default'])
     trait1.push(currentPokemon['types']['0']['type']['name'])
     pokeId.push(currentPokemon['id'])
     height.push(currentPokemon['height'])
     weight.push(currentPokemon['weight'])

     const firstType = currentPokemon['types'][0]['type']['name'];
     if (currentPokemon['types'].length > 1) {
          // Zugriff auf den zweiten Typ
          const secondType = currentPokemon['types'][1]['type']['name'];
          trait2.push(secondType)
     } else {
          trait2.push(null);
     }
}

function filterNames() {
     let search = document.getElementById('search').value.toLowerCase();
     let filteredPokemon = [];

     for (let j = 0; j < loadedPokemonName.length; j++) {
          if (loadedPokemonName[j].toLowerCase().includes(search)) {
               filteredPokemon.push(j);
          }
     }
     showFilteredPokemon(filteredPokemon)
}

function showFilteredPokemon(filteredPokemon) {
     for (let i = 0; i < loadedPokemonName.length; i++) {
          let pokemonContainer = document.getElementById(`pokemon-container${i}`);
          let flipCard = document.getElementById(`flip-card${i}`)
          if (filteredPokemon.includes(i)) {
               pokemonContainer.style.display = ''; // Zeige das Pokémon
               flipCard.style.display = '';
          } else {
               flipCard.style.display = 'none'; // Verstecke das Pokémon
          }
     }
}

async function loadMore() { // WICHTIG! Reihenfolge beachten. Erst startAmount und dann loadPokemon()
     startAmount += 40;
     await loadPokemon()
     
}

function scrollUP(){
     window.scrollTo({
          top: 0, 
          behavior: 'smooth' 
      });
}

function FirstLetterUpperCase() { // Anfangsbuchstaben der Pokemon gross schreiben.
     for (var i = 0; i < loadedPokemonName.length; i++) {
          loadedPokemonName[i] = loadedPokemonName[i].charAt(0).toUpperCase() + loadedPokemonName[i].substr(1);
     }
}

async function renderPokemon() {
     for (let i = startAmount - 1; i < startAmount + 39; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          let currentTrait1 = trait1[i];
          let currentTrait2 = trait2[i];
          let currentId = pokeId[i];
          let currentHeight = formatNumbers(height[i].toFixed());
          let currentWeight = formatNumbers(weight[i].toFixed());

          document.getElementById('show-pokemon').innerHTML += showCards(i, currentPokemonName, currentPokemonImg, currentTrait1, currentTrait2, currentId, currentHeight, currentWeight);
          setBackgroundColor(i, currentTrait1);
          setFirstTraitColor(i, currentTrait1);
          setSecondTraitColor(i, currentTrait2);
     }
}




function setBackgroundColor(i, currentTrait1) {
     const backgroundColors = {
          'fire': 'red', 'normal': 'grey', 'water': 'blue', 'grass': 'green',
          'bug': 'darkgreen', 'poison': 'purple', 'electric': 'rgb(169, 184, 79)', 'ground': 'brown',
          'fairy': 'rgb(234, 75, 157)', 'fighting': 'rgb(90, 5, 5)', 'rock': 'rgb(50, 43, 43)',
          'psychic': 'rgb(122, 113, 113)', 'ghost': 'rgb(174, 140, 255)', 'ice': 'rgb(186, 242, 239)',
          'dragon': 'rgb(255, 214, 139)'
     };

     const backgroundColor = backgroundColors[currentTrait1];
     if (backgroundColor) {
          document.getElementById(`pokemon-container${i}`).style.backgroundColor = backgroundColor;
          document.getElementById(`flip-card-back${i}`).style.backgroundColor = backgroundColor;
     }
}

function setFirstTraitColor(i, currentTrait1) {
     const backgroundColors = {
          'fire': 'rgb(242, 56, 56)', 'normal': 'rgb(94, 92, 92)', 'water': 'rgb(53, 75, 242)', 'grass': 'rgb(48, 240, 67)',
          'bug': 'rgb(37, 125, 25)', 'poison': 'rgb(142, 49, 235)', 'electric': 'yellow', 'ground': 'rgb(145, 76, 10)',
          'fairy': 'rgb(232, 60, 203)', 'fighting': 'rgb(227, 32, 64)', 'rock': 'rgb(52, 54, 40)',
          'psychic': 'rgb(137, 153, 17)', 'ghost': 'rgb(189, 166, 157)', 'ice': 'rgb(71, 252, 255)', 'dragon': 'rgb(237, 142, 33)'
     };
     let backgroundColor = backgroundColors[currentTrait1];
     if (backgroundColor) {
          document.getElementById(`traits${i}`).style.backgroundColor = backgroundColor;
          document.getElementById(`backcard-trait${i}`).style.backgroundColor = backgroundColor;

     }
}

function setSecondTraitColor(i, currentTrait2) {
     const backgroundColors = {
          'flying': 'rgb(50, 228, 237)', 'poison': 'rgb(142, 49, 235)', 'ground': 'rgb(145, 76, 10)', 'fairy': 'rgb(232, 60, 203)', 'ice': 'rgb(71, 252, 255)'
     }
     let backgroundColor = backgroundColors[currentTrait2];
     if (backgroundColor) {
          document.getElementById(`secondTrait${i}`).style.backgroundColor = backgroundColor;
          document.getElementById(`backcard-second-trait${i}`).style.backgroundColor = backgroundColor;
     }
}

function formatNumbers(height) {
     if (height < 10) {
          return `0.${height}`;
     } else {
          return `${height / 10}`;
     }
}

function openCard(i) {
     const currentPokemonName = loadedPokemonName[i];
     const currentPokemonImg = loadedPokemonImg[i];
     const currentTrait1 = trait1[i];
     const currentTrait2 = trait2[i];
     const currentId = pokeId[i];
     const moves = pokemonMoves[i];
     const showMoves = moves.map(move => `<span class="move">${move.name}</span>`).join(' ');  // Damit kann man Leerzeichen zwischen den moves platzieren und jedes move bekommt ein span um ihn zu stylen.
     const popupContent = document.getElementById('popup-pokemon');

     popupContent.innerHTML = showOpenCards(currentPokemonName, currentPokemonImg, currentTrait1, currentTrait2, currentId, moves, showMoves);
     popupSettings(i, currentTrait1)
}

function popupSettings(i, currentTrait1) {
     setTimeout(() => { // sonst wird die Chartfunktion zu früh gestartet und funktioniert nicht
          renderChart(i);
     }, 0);

     setModalBackgroundColor(currentTrait1);

     const modalContainer = document.getElementById(`modal-container`);
     const overlay = document.getElementById('overlay');

     modalContainer.style.display = 'block';
     overlay.style.display = 'block';
}


function closeModal() {
     const modalContainer = document.getElementById('modal-container');
     const overlay = document.getElementById('overlay');

     modalContainer.style.display = 'none';
     overlay.style.display = 'none';

}

function setModalBackgroundColor(trait) {
     const modalContainer = document.getElementById('modal-container');
     const backgroundColors = {
          'fire': 'red', 'normal': 'grey', 'water': 'blue', 'grass': 'green',
          'bug': 'darkgreen', 'poison': 'purple', 'electric': 'rgb(230, 247, 124)', 'ground': 'brown',
          'fairy': 'rgb(234, 75, 157)', 'fighting': 'rgb(90, 5, 5)', 'rock': 'rgb(50, 43, 43)',
          'psychic': 'rgb(122, 113, 113)', 'ghost': 'rgb(174, 140, 255)', 'ice': 'rgb(186, 242, 239)', 'dragon': 'rgb(255, 214, 139)'
     };
     const backgroundColor = backgroundColors[trait];

     if (backgroundColor) {
          modalContainer.style.backgroundColor = backgroundColor;
     } else {
          // Hintergrundfarbe, wenn die Eigenschaft nicht gefunden wird
          modalContainer.style.backgroundColor = 'white';
     }
}





