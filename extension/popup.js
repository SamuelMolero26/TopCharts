var port = chrome.runtime.connect({ name: 'popup-to-background-connection' });

var button = document.getElementById('fetchButton');

button.addEventListener('click', function() {
    var artistName = document.getElementById('artistName').value;

    port.postMessage({ message: 'fetchData', artist_name: artistName });

});

// Listen for responses from the background script
port.onMessage.addListener(function(response) {
    if (response && response.error)
    {
        console.log("Error", response.error)
    }
    else if (response) {
        document.getElementById('dataDisplay').innerHTML = JSON.stringify(response.data);
    } else {
        console.error('Unexpected response:', response);
    }
});