chrome.runtime.sendMessage({message: 'getData'}, function(response) {
    console.log(response);  
});