const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', searchRecommendation);

clearBtn.addEventListener('click', clearResults);

function searchRecommendation() {

  const input = document
    .getElementById('searchInput')
    .value
    .toLowerCase();

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

      resultsDiv.innerHTML = '';

      let items = [];

      if(input.includes('beach')) {
        items = data.beaches;
      }

      else if(input.includes('temple')) {
        items = data.temples;
      }

      else if(
        input.includes('country') ||
        input.includes('countries')
      ) {
        items = data.countries;
      }

      else {
        resultsDiv.innerHTML =
          '<h2>No recommendations found.</h2>';
        return;
      }

      items.forEach(item => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}">

          <div class="card-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;

        resultsDiv.appendChild(card);

      });

    });

}

function clearResults() {

  resultsDiv.innerHTML = '';

  document.getElementById('searchInput').value = '';

}
