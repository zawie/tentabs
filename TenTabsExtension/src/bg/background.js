// Open ten tab pages when user clicks on extension icon
chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "TenTabs.html";
    chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
});

//Takes table of links and opens tabs for each of the links
function openLinks(linksObj) {
  console.log("Running openLinks");
  console.log(linksObj)
  var isFirst = true;
  for (url in linksObj.links) {
    chrome.tabs.create({ url: linksObj.links[url], active: isFirst});
    isFirst = false;
  }
}

// Runs on new page load
chrome.webNavigation.onCompleted.addListener(function(data) {
  if (data.url.startsWith("https://www.google.com/search") || data.url.startsWith("http://www.google.com/search")) {
    chrome.storage.local.get(['searched'], function(value){
      console.log(typeof(value.searched))
      if (value.searched){
        chrome.storage.local.set({'searched': false});
        chrome.tabs.sendMessage(data.tabId, {action:"getLinks"}, openLinks);
      }
    });
  }
});
