chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === 'popup-to-background-connection');
    console.log('connected to port', port.name)
    port.onMessage.addListener(function(request) {
        if (request.message === 'fetchData') {
            console.log('Received request:', request)
            var artist_name = request.artist_name;
            fetch(`http://127.0.0.1:5000/artist/${artist_name}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(fetchedData => {
                    port.postMessage({ data: fetchedData });
                })
                .catch(error => {
                    // console.error('Error:', error);
                    port.postMessage({ error: error.toString() });
                });
        }
    });
});
