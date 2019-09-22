// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'getLinks') {
        var dom = Array.prototype.slice.call( document.getElementsByClassName("r") )
        maxSize = 10
        if(msg.numTabs != null){
            maxSize = msg.numTabs
        }
        parseSize = dom.length;
        if (parseSize > maxSize) {
            parseSize = maxSize;
        }
        links = Array();
        for (i = 0; i < parseSize; i++) {
            inHTML = dom[i].innerHTML;
            link = inHTML.match(/"(.*?)"/)[0].slice(1, -1);
            links.push(link);
        }
        sendResponse({'links':links})
    }
});