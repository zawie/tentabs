//Takes html from a google search and parses it into a table of strings (links)
export function parseText() {
    //array of divs from webpages
    divs = document.getElementsByClassName("r") 
    URLs = Array()
    //get URL from each div and append it to URLs array
    for (i = 0; i < divs.length; i++) {
        URLs.push(divs[i].baseURI)
    }
    return URLs
} 
parseText()