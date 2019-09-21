//Takes html from a google search and parses it into a table of strings (links)
function parseText(maxSize = 10) {
    //array of divs from webpages
    divs = document.getElementsByClassName("r");
    //Define how long loop will go for
    parseSize = divs.length;
    if (parseSize > maxSize) {
        parseSize = maxSize;
    }
    links = Array();
    //get URL from each div and append it to URLs array
    for (i = 0; i < parseSize; i++) {
        innerHTML = divs[i].innerHTML;
        link = innerHTML.match(/"(.*?)"/);
        links.push(link);
    }
    return links
}

// export { parseText };