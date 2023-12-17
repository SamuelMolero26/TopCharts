//fetching the data from the python files

let data; //let because it is withnt the same scope
//withint the same block 
 //---uwu:--

fetch('http://localhost:5000/data&scripts')
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
    });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getData') {
        sendResponse(data);
    }
});
