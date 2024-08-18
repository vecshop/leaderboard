
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

      function hideLoadingSpinner() {
          document.getElementById('loadr').style.display = 'none';
      }

      function showLoadingSpinner() {
          document.getElementById('loadr').style.display = 'block';
      }

fetch('https://script.google.com/macros/s/AKfycbxIBqu5HHfOwbpxF-gXiAL7OH_7uuYPfdEbx3W3p3LLB2vRyETmAakXEa8MsfDR1Jiebw/exec')
  .then(response => response.json())
  .then(data => {
      showLoadingSpinner();
      
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

          // Untuk Rank 1, tambahkan gambar goldrank.png di atas nomor rank
                topThree += `<div class="card ${rankClass}">`;

                if (i === 0) {
                    topThree += `<img src="img/goldrank.webp" alt="gold" class="cymbol_r1">`;
                }
          if (i === 1) {
              topThree += `<img src="img/silverrank.webp" alt="silver" class="cymbol_r2">`;
          }
          if (i === 2) {
              topThree += `<img src="img/bronzerank.webp" alt="silver" class="cymbol_r3">`;
          }

                topThree += `
                                <div class="rank">${i + 1}</div>
                                <div class="name">${data[i].name}</div>
                                <div class="points">${data[i].points} <img src="img/coinxx.webp" alt="Coin" class="coin-icon"></div>
                             </div>`;
            }

            topThree += `</div>`;
            leaderboard.innerHTML += topThree;

      for (let i = 3; i < data.length; i++) {
          let card = `<div class="card">
                          <div class="rank">${i + 1}</div>
                          <div class="name">${data[i].name}</div>
                          <div class="points">${data[i].points} <img src="img/coinxx.webp" alt="Coin" class="coin-icon"></div>
                      </div>`;
          leaderboard.innerHTML += card;
      }

        hideLoadingSpinner();

        // Tambahkan kelas visible setelah DOM diperbarui
        setTimeout(() => {
            document.querySelectorAll('.card.rank-1, .card.rank-2, .card.rank-3').forEach(card => {
                card.classList.add('visible');
            });
        }, 100); // Delay kecil agar animasi terlihat setelah render

            // Process data and create cards
            // ...

            // Apply fade-in animation after data is loaded and cards are created
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                if (index >= 3) { // Rank 4 and onwards
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 100 * (index - 2));
                }
            });
      
      
  })
    

.catch(error => {
    console.error('Error fetching data:', error);
        hideLoadingSpinner(); // Pastikan spinner disembunyikan jika terjadi error
});

