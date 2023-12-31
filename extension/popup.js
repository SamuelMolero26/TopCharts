var port = chrome.runtime.connect({ name: 'popup-to-background-connection' });

var button = document.getElementById('fetchButton');

var form = document.getElementById('artistForm');


window.onload = function() {
    port.postMessage({ message: 'fetchMarkets' });
    fetch('http://127.0.0.1:5000/markets')
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with the available markets
            var marketDropdown = document.getElementById('market');
            data.forEach(function(market) {
                var option = document.createElement('option');
                option.value = market;
                option.textContent = market;
                marketDropdown.appendChild(option);
            });
        });
};

port.onMessage.addListener(function(response) {

    if(response.message == 'markets') {
        var marketDropdown = document.getElementById('market');
        response.data.forEach(function(market) {
            var option = document.createElement('option');
            option.value = market;
            option.textContent = market;
            marketDropdown.appendChild(option);
        });
    }

});


form.addEventListener('submit', function(event) {
    event.preventDefault();
    var artistName = document.getElementById('artistName').value;
    var marketDropdown = document.getElementById('market');
    var selectedMarket =  marketDropdown.options[marketDropdown.selectedIndex].value;

    port.postMessage({ message: 'fetchData', artist_name: artistName, market: selectedMarket });

});




// Listen for responses from the background script
port.onMessage.addListener(function(response) {
    if (response && response.error)
    {
        console.log("Error", response.error)
    }
    else if (response) {
        var dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = '';

        response.data[0]['Track Info'].forEach(function(track) {

            console.log(track);
            var img = document.createElement('img');
            img.src = track.Cover;
            img.alt = track['Track Name'];
            img.width = 50;
            img.height = 50;

            var title = document.createElement('p');
            title.textContent = 'Title: ' + track['Track Name'];

            var albumName = document.createElement('p');
            albumName.textContent = 'Album: ' + track['Album Name'];

            var popularity = document.createElement('p');
            popularity.textContent = 'Popularity: ' + track.Popularity;

            dataDisplay.appendChild(img);  
            dataDisplay.appendChild(title);  
            dataDisplay.appendChild(albumName);  
            dataDisplay.appendChild(popularity);
        });

    } else {
        console.error('Unexpected response:', response);
    }
});