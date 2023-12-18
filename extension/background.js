//fetching the data from the python files

let data; //let because it is withnt the same scope
//withint the same block 
 //---uwu:--

 fetch('http://127.0.0.1:5000/scripts')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(fetchedData => {
        data = fetchedData;
    })
    .catch(error => {
        console.error('An error occurred:', error);
 });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getData') {
        sendResponse(data);
    }
});
