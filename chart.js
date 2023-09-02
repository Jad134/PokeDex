 let backgroundColorChart = ['rgba(31, 245, 7, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 255, 0.6)', 'rgba(255, 208, 0, 0.6)']
function renderChart(selectedPokemonIndex){
    
    const stats = pokemonStats[selectedPokemonIndex];

    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stats.map(stat => stat.name),
      datasets: [{
        label: 'stats',
        data:  stats.map(stat => stat.value), // Verwenden Sie die Werte der Statistiken als Daten,
        borderWidth: 1,
        backgroundColor: backgroundColorChart ,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}