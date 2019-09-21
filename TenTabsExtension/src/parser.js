//Takes html from a google search and parses it into a table of strings (links)
export function parseText() {
    divs = docoument.getElementsByClassName("r") //array of divs from webpages
    URLs = Array()
    for (div in divs) {
        URL = div.baseURI
        URLs.push(URL)
    }
    return URLs
}