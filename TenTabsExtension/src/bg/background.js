// Open ten tab pages when user clicks on extension icon
chrome.browserAction.onClicked.addListener(function(activeTab) {
    var newURL = "TenTabs.html";
    numTabs = chrome.tabs.get
    chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
});

//Takes table of links and opens tabs for each of the links
function openLinks(linksObj) {
  console.log("Running openLinks");
  console.log(linksObj)
  //var isFirst = true;
  //for (url in linksObj.links) {
    //chrome.tabs.create({ url: linksObj.links[url], active: isFirst});
    //isFirst = false;
  chrome.tabs.create({ url: linksObj.links[0]}, function(tab){
    chrome.storage.local.set({'newTab':tab.id, 'links':linksObj.links})
    console.log("added " + tab.id)
  });
  //}
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
  chrome.storage.local.get(['newTab', 'links'], function(result){
    if(data.tabId === result.newTab){
      for (url in result.links) {
        //chrome.tabs.create({ url: linksObj.links[url], active: isFirst});
        //isFirst = false;
        if(url != 0){
          chrome.tabs.create({ url: result.links[url], active: false});
        }
      }
      linksToBeOpened = null
    }
    chrome.storage.local.set({'newTab':null, 'links':null})
  })
});

//Shortcuts
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});