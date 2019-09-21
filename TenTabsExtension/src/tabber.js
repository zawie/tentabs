//Takes table of links and opens tabs for each of the links
export function openLinks(links) {
    for (url in links) {
        chrome.tabs.create({ url: url });
    }
}
