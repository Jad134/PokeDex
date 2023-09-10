function showCards(i, currentPokemonName,  currentPokemonImg,  currentTrait1, currentTrait2, currentId, currentHeight, currentWeight){
    return /*html*/`
    <div  onclick="openCard(${i}) " id="flip-card${i}" class="flip-card">
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
    </div> `;
}

function showOpenCards(currentPokemonName, currentPokemonImg, currentTrait1, currentTrait2, currentId, moves, showMoves){
    return /*html*/`
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
    </div> `;
}