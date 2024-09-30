document.addEventListener("DOMContentLoaded", function() {
    const searchTextBox = document.getElementById("input-show");
    const searchButton = document.getElementById("submit-data");
    const showContainer = document.querySelector(".show-container");

    searchButton.addEventListener("click", function() {
        const showName = searchTextBox.value.trim();
        if (showName) {
            const apiUrl = `https://api.tvmaze.com/search/shows?q=${showName}`;
            fetchShowData(apiUrl);
        }
    });

    function fetchShowData(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayShows(data);
            })
            .catch(error => {
                console.error("Error fetching show data: ", error);
            });
    }

    function displayShows(shows) {
        showContainer.innerHTML = ''; // Clear previous results
        shows.forEach(item => {
            const showElement = document.createElement("div");
            showElement.classList.add("show-data");

            const imageUrl = item.show.image ? item.show.image.medium : "https://via.placeholder.com/210x295?text=No+Image";
            const showSummary = item.show.summary ? item.show.summary : "<p>No summary available.</p>";

            showElement.innerHTML = `
                <img src="${imageUrl}" alt="${item.show.name}" class="img-fluid">
                <div class="show-info">
                    <h1>${item.show.name}</h1>
                    ${showSummary}
                </div>
            `;
            showContainer.appendChild(showElement);
        });
    }
});


