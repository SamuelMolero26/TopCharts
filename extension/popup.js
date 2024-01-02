var port = chrome.runtime.connect({ name: 'popup-to-background-connection' });

var button = document.getElementById('fetchButton');

var form;

var selectedMarket;

window.onload = function() {
    form = document.getElementById('artistForm');
    port.postMessage({ message: 'fetchMarkets' });
    fetch('http://127.0.0.1:5000/markets')
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with the available markets
            var marketDropdown = document.getElementById('marketDropdown');
            data.forEach(function(market) {
                var option = document.createElement('option');
                option.value = market;
                option.textContent = market;
                marketDropdown.appendChild(option);
            });
        });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var artistName = document.getElementById('artistName').value;
        var selectedMarket = document.getElementById('marketDropdown').value;
    
        port.postMessage({ message: 'fetchData', artist_name: artistName, market: selectedMarket });
    });
    
};

//-----------------drop down options/menu -----------------------
port.onMessage.addListener(function(response) {

    if(response.message == 'markets') {
        var marketDropdown = document.querySelector('.dropdown-menu');
        response.data.forEach(function(market) {
            var option = document.createElement('option');
            option.value = market;
            option.textContent = market;
            marketDropdown.appendChild(option);
        });
    }

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
            img.className = 'album-image';
            img.alt = track['Track Name'];
            img.width = 70;
            img.height = 70;

            var title = document.createElement('p');
            title.textContent = 'Title: ' + track['Track Name'];

            var albumName = document.createElement('p');
            albumName.textContent = 'Album: ' + track['Album Name'];

            var popularity = document.createElement('p');
            popularity.textContent = 'Popularity: ' + track.Popularity;

            var tracklink = document.createElement('a');
            tracklink.href = track['Song URI'].replace('spotify:track:', 'https://open.spotify.com/track/');
            tracklink.target = '_blank';

            tracklink.appendChild(img);

            dataDisplay.appendChild(tracklink);
            //dataDisplay.appendChild(img);  
            dataDisplay.appendChild(title);  
            dataDisplay.appendChild(albumName);  
            dataDisplay.appendChild(popularity);
        });

    } else {
        console.error('Unexpected response:', response);
    }
});