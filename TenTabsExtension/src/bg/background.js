chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "TenTabs.html";
    chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(changeInfo.status === 'complete');
  if (changeInfo.status === 'complete'){
    console.log("Tab " +tabId+ " has finished loading");
    if (tab.url.startsWith("https://www.google.com/search") || 
      tab.url.startsWith("http://www.google.com/search")) {
      // Add check for chrome stored flag
      val = chrome.storage.local.get(['searched']);
      console.log(typeof(val.searched))
      if (val.searched){
        console.log('Seach page loaded as a result of tentabs')
      }
      console.log("Search page created");
      openLinks(parseText());
    }
  }
});

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

//Takes table of links and opens tabs for each of the links
function openLinks(links) {
  var isFirst = true;
  for (url in links) {
      chrome.tabs.create({ url: url, active: isFirst});
      isFirst = false;
  }
}

/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
 // how to fetch tab url using activeInfo.tabid
 chrome.tabs.get(activeInfo.tabId, function(tab){
    console.log(tab.url);
 });
}); 
*/

