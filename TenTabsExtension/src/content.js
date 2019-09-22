// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'getLinks') {
        var dom = Array.prototype.slice.call( document.getElementsByClassName("r") )
        var divs = Array.prototype.slice.call( document.getElementsByTagName("DIV") )
        console.log(typeof(dom), dom[0])
        //console.log(JSON.stringify(dom))
        console.log(typeof(divs), divs[0])
        //console.log(JSON.stringify(divs))
        maxSize = 10
        if(msg.numTabs != null){
            maxSize = msg.numTabs
        }
        parseSize = dom.length;
        if (parseSize > maxSize) {
            parseSize = maxSize;
        }

        actualDivs = Array()
        for (i = 0; i < dom.length; i++) {
            for(j = 0; j < divs.length; j++){
                if(dom[i] === divs[j] && dom[i].innerHTML != ""){
                    console.log(dom[i], dom[i].innerHTML)
                    actualDivs.push(dom[i])
                }
            }
        }
        if(actualDivs.length < parseSize){
            parseSize = actualDivs.length
        }

        links = Array();
        for (i = 0; i < parseSize; i++) {
            console.log(actualDivs[i])
            inHTML = actualDivs[i].innerHTML;
            console.log(inHTML)
            link = inHTML.match(/"(.*?)"/)[0].slice(1, -1);
            links.push(link);
        }
        sendResponse({'links':links})
    }
});