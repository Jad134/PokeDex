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

     for (let i = startAmount; i < startAmount + 20; i++) {
          let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          let response = await fetch(url);
          let currentPokemon = await response.json();

          const stats = currentPokemon.stats.map(stat => ({
               name: stat.stat.name,
               value: stat.base_stat
          }));

          const moves = currentPokemon.moves.map(move => ({
               name: move.move ? move.move.name : "Unknown Move"
           }));
               
          
          pokemonMoves.push(moves);

          pokemonStats.push(stats);

          

          loadedPokemonName.push(currentPokemon['name'])
          loadedPokemonImg.push(currentPokemon['sprites']['other']['dream_world']['front_default'])
          trait1.push(currentPokemon['types']['0']['type']['name'])
          pokeId.push(currentPokemon['id'])
          height.push(currentPokemon['height'])
          weight.push(currentPokemon['weight'])
          

          // wieso funktioniert hier currentPokemon obwohl es ausserhalb der schleife ist?
          

          

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
     for (let i = startAmount - 1; i < startAmount + 19; i++) {
          let currentPokemonName = loadedPokemonName[i];
          let currentPokemonImg = loadedPokemonImg[i];
          let currentTrait1 = trait1[i];
          let currentTrait2 = trait2[i];
          let currentId = pokeId[i];
          let currentHeight = formatNumbers(height[i].toFixed());
          let currentWeight = formatNumbers(weight[i].toFixed());


         

          document.getElementById('show-pokemon').innerHTML += /*html*/`
<div class="flip-card">
    <div class="flip-card-inner">
        <div  class="pokemon-container flip-card-front " id="pokemon-container${i}">
            <h3>${currentPokemonName}</h3>
            <div class="imgAndTrait">
                <img src="${currentPokemonImg}" id="poke-img">
                <span class="traits" id="traits${i}">${currentTrait1}</span>
                ${currentTrait2 !== null ? `<span class="traits" id="secondTrait${i}">${currentTrait2}</span>` : ''}

            </div>

        </div>
          <div onclick="openCard(${i}) " id="flip-card-back${i}" class="flip-card-back">
              <div class="back-card-header"> 
                <h1>${currentPokemonName}</h1> 
                </div>
                <div class="back-card-mainInfo">
                 <div id="id-container">
                    <h2>Type</h2>
                    <span class="id-number"> # ${currentId}</span>
                 </div>
                 <span id="backcard-trait${i}" class="backcard-trait">${currentTrait1}</span>
                 ${currentTrait2 !== null ? `<span id="backcard-second-trait${i}" class="backcard-trait">${currentTrait2}</span>` : ''}
                </div>
                  <div class="back-card-second-info">
                    <span>Height: <span class="height-style"> ${currentHeight} m</span> </span>
                    <span>Weight: <span class="height-style"> ${currentWeight} kg</span> </span>
                   
                  </div>
          </div>

    </div>
</div>
          
               `;

          setBackgroundColor(i, currentTrait1);
          setFirstTraitColor(i, currentTrait1);
          setSecondTraitColor(i, currentTrait2);
     }

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
          document.getElementById(`flip-card-back${i}`).style.backgroundColor = backgroundColor;

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
     console.log(`openCard${i + 1} `)
     const currentPokemonName = loadedPokemonName[i];
     const currentPokemonImg = loadedPokemonImg[i];
     const currentTrait1 = trait1[i];
     const currentTrait2 = trait2[i];
     const currentId = pokeId[i];
     const moves = pokemonMoves[i];
     const showMoves = moves.map(move => `<span class="move">${move.name}</span>`).join(' ');  // Damit kann man Leerzeichen zwischen den moves platzieren und jedes move bekommt ein span um ihn zu stylen.
    


     const popupContent = document.getElementById('popup-pokemon');
     popupContent.innerHTML = /*html*/`
     <div class="open-card-header">
         <h1>${currentPokemonName}</h1>
     </div>
     <div class="stats-and-img">
      <div class="d-none" >${currentTrait1}</div>
       <img class="open-cardImg" src="${currentPokemonImg}" alt="${currentPokemonName}">
       <div class="stats">
          <canvas id="myChart"></canvas>
       </div>
 
     </div>
     <span class="section-moves">Moves</span>
     <div class="move-container">
          <div id="moves">${showMoves}</div>
     </div>
         
         <!-- Weitere Informationen zum Pokemon hier einfügen -->
     `;

     setTimeout(() => {
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
          'psychic': 'rgb(122, 113, 113)', 'ghost': 'rgb(174, 140, 255)', 'ice': 'rgb(186, 242, 239)',
          'dragon': 'rgb(255, 214, 139)'
     };
     const backgroundColor = backgroundColors[trait];

     if (backgroundColor) {
          modalContainer.style.backgroundColor = backgroundColor;
     } else {
          // Hintergrundfarbe, wenn die Eigenschaft nicht gefunden wird
          modalContainer.style.backgroundColor = 'white';
     }
}





