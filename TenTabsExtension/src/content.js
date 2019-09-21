// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'getLinks') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        var dom = Array.prototype.slice.call( document.getElementsByClassName("r") )
        maxSize = 10
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