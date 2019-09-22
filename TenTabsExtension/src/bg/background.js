// Open ten tab pages when user clicks on extension icon
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.query({windowId:chrome.windows.WINDOW_ID_CURRENT}, function(tabsArr){
      if(tabsArr.length === 1 && tabsArr[0].url === 'chrome://newtab/'){
        chrome.tabs.update({url:'TenTabs.html'})
      } else {
        chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
      }
    })
});

//Takes table of links and opens tabs for each of the links
function openLinks(linksObj) {
  chrome.tabs.create({ url: linksObj.links[0]}, function(tab){
    chrome.storage.local.set({'newTab':tab.id, 'links':linksObj.links})
  });
}

// Runs on new page load
chrome.webNavigation.onCompleted.addListener(function(data) {
  if (data.url.startsWith("https://www.google.com/search") || data.url.startsWith("http://www.google.com/search")) {
    chrome.storage.local.get(['searched'], function(value){
      if (value.searched){
        chrome.storage.local.set({'searched': false});
        chrome.storage.local.get('numTabs', function(result){
          chrome.tabs.sendMessage(data.tabId, {action:"getLinks", numTabs:result.numTabs}, openLinks);
        })
      }
    });
  }
  chrome.storage.local.get(['newTab', 'links'], function(result){
    if(data.tabId === result.newTab){
      for (url in result.links) {
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
function runCommand (command) {
  selectedId = 0
  // Get Current ID
  chrome.tabs.getSelected(null, function(tab) {
    selectedId = tab.id
  });
  chrome.tabs.getAllInWindow(null, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      var currentId = tabs[i].id 
      if (selectedId == currentId) {
        var j = i
        if (command == "shiftleft") {
          j -= 1
        } else if (command == "shiftright") {
          j += 1
        }
        if (j >= tabs.length){
          j = 0
        } else if (j < 0) {
          j = tabs.length - 1
        }
        newId = tabs[j].id
        chrome.tabs.update(newId, {active: true})
      }
    }
  });
}
chrome.commands.onCommand.addListener(runCommand);
