const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

async function fetchRecommendations() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();

        const filtered = data.places.filter(place =>
            place.type.toLowerCase() === query
        );

        displayResults(filtered, query);
    } catch (err) {
        console.error("Error fetching JSON:", err);
        resultsDiv.innerHTML = "<p>Error loading recommendations.</p>";
    }
}

function displayResults(items, keyword) {
    resultsDiv.innerHTML = "";
    if (items.length === 0) {
        resultsDiv.innerHTML = `<p>No ${keyword} found.</p>`;
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("result-card");

        div.innerHTML = `
            <img src="${item.imagesrc}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        resultsDiv.appendChild(div);
    });
}

function clearResults() {
    resultsDiv.innerHTML = "";
    searchInput.value = "";
}

searchBtn.addEventListener("click", fetchRecommendations);
clearBtn.addEventListener("click", clearResults);
