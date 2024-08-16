window.addEventListener('scroll', function() {
    const title = document.querySelector('h1');
     const scrollThreshold = 50; // Adjust as needed
    if (scrollY > scrollThreshold) {
        title.style.opacity = '0';
    } else {
        title.style.opacity = '1';
    }

    
    const tooltipContainer = document.querySelector('.tooltip-container');
    if (scrollY > scrollThreshold) {
        tooltipContainer.style.opacity = '0';
    } else {
        tooltipContainer.style.opacity = '1';
    }

    if (scrollY > scrollThreshold) {
        title.style.fontSize = `${minFontSize}px`;
    } else {
        const fontSize = maxFontSize - ((scrollY / scrollThreshold) * (maxFontSize - minFontSize));
        title.style.fontSize = `${fontSize}px`;
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < 100) {
            card.style.opacity = '0';
        } else {
            card.style.opacity = '1';
        }
    });
});



fetch('https://script.google.com/macros/s/AKfycbxIBqu5HHfOwbpxF-gXiAL7OH_7uuYPfdEbx3W3p3LLB2vRyETmAakXEa8MsfDR1Jiebw/exec')
  .then(response => response.json())
  .then(data => {
      data.sort((a, b) => b.points - a.points);
      let leaderboard = document.getElementById('leaderboard');

      let topThree = `<div class="card-row">`;
      for (let i = 0; i < data.length; i++) {
          let rankClass = '';
          if (i === 0) {
              rankClass = 'rank-1';
          } else if (i === 1) {
              rankClass = 'rank-2';
          } else if (i === 2) {
              rankClass = 'rank-3';
          } else {
              break;
          }

          topThree += `<div class="card ${rankClass}">
                          <div class="rank">${i + 1}</div>
                          <div class="name">${data[i].name}</div>
                          <div class="points">${data[i].points} <img src="img/coinxx.png" alt="Coin" class="coin-icon"></div>
                       </div>`;
      }
      topThree += `</div>`;
      leaderboard.innerHTML += topThree;

      for (let i = 3; i < data.length; i++) {
          let card = `<div class="card">
                          <div class="rank">${i + 1}</div>
                          <div class="name">${data[i].name}</div>
                          <div class="points">${data[i].points} <img src="img/coinxx.png" alt="Coin" class="coin-icon"></div>
                      </div>`;
          leaderboard.innerHTML += card;
      }
  })
  .catch(error => console.error('Error fetching data:', error));
