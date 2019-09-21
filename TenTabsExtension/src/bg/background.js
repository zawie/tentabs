chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "TenTabs.html";
    chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
});

//Takes html from a google search and parses it into a table of strings (links)
function parseText(tabID, maxSize = 10) {
  console.log("Running parseText")
  //array of divs from webpages
  //divs = document.getElementsByClassName("r");
  console.log(typeof(tabID))
  //chrome.tabs.sendMessage(tabID, {action:"getDOM"});
  var links = null
  chrome.tabs.sendMessage(tabID, {action:"getDOM"}, openLinks);

  //console.log(document)
  //Define how long loop will go for
  /*
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
  */
}

//Takes table of links and opens tabs for each of the links
function openLinks(linksObj) {
  console.log("Running openLinks");
  console.log(linksObj)
  // console.log(typeof(linksObj))
  // console.log(linksObj.links)
  // console.log(typeof(linksObj.links))
  // console.log(linksObj.links[0])
  // console.log(linksObj.links['0'])
  var isFirst = true;
  for (url in linksObj.links) {
    //console.log(url);
    //console.log(typeof(url));
    //console.log(linksObj.links[url])
    chrome.tabs.create({ url: linksObj.links[url], active: isFirst});
    isFirst = false;
  }
}

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   console.log(changeInfo.status === 'complete');
//   if (changeInfo.status === 'complete'){
//     console.log("Tab " +tabId+ " has finished loading");
//     if (tab.url.startsWith("https://www.google.com/search") || 
//       tab.url.startsWith("http://www.google.com/search")) {
//       // Add check for chrome stored flag
//       chrome.storage.local.get(['searched'], function(value){
//         console.log(typeof(value.searched))
//         if (value.searched){
//           console.log('Seach page loaded as a result of tentabs');
//           chrome.storage.local.set({'searched': false});
//           openLinks(parseText(tab));
//         }
//       });
//     }
//   }
// });

chrome.webNavigation.onCompleted.addListener(function(e) {
  console.log("ONCOMPLETED")
  console.log(typeof(e))
  console.log(e)
  if (e.url.startsWith("https://www.google.com/search") || e.url.startsWith("http://www.google.com/search")) {
    console.log("IS GOOGLE SEARCH")
    chrome.storage.local.get(['searched'], function(value){
      console.log(typeof(value.searched))
      if (value.searched){
        console.log('Seach page loaded as a result of tentabs');
        chrome.storage.local.set({'searched': false});
        console.log("parseText returns: " + parseText(e.tabId));
        //openLinks(links)
      }
    });
  }
});
//, {url: [{hostContains: 'www.google.com/search?q'}]}
/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
 // how to fetch tab url using activeInfo.tabid
 chrome.tabs.get(activeInfo.tabId, function(tab){
    console.log(tab.url);
 });
}); 
*/

