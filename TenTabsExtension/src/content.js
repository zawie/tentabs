// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Getting links")
    if (msg.action === 'getLinks') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        var dom = Array.prototype.slice.call( document.getElementsByClassName("r") )
        console.log("About to search for numTabs")
        maxSize = 10
        prom = new Promise(function(resolve, reject){
            chrome.storage.local.get('numTabs', function(result){
                console.log("Searched for numTabs")
                console.log(result)
                resolve(result.numTabs)
            })
        })
        
        prom.then(function(numTabs){
            if(numTabs != null){
                maxSize = numTabs
            }
        })

        parseSize = dom.length;
        if (parseSize > maxSize) {
            parseSize = maxSize;
        }
        links = Array();
        //get URL from each div and append it to URLs array
        for (i = 0; i < parseSize; i++) {
            inHTML = dom[i].innerHTML;
            link = inHTML.match(/"(.*?)"/)[0].slice(1, -1);
            links.push(link);
        }
        console.log(links)
        sendResponse({'links':links})
        
    }
});