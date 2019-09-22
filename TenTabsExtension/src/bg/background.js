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

var newTab_ = null;
var links_ = null;

function openLinks(linksObj) {
  console.log("Creating tabs")
  chrome.tabs.create({ url: linksObj.links[0]}, function(tab){
    console.log("Created first tab " + linksObj.links[0])
    newTab_ = tab.id; links_ = linksObj.links;
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
  } else {
      console.log("completed TAb", data.tabId, "new tab is supposed to be", newTab_);
      if(data.tabId === newTab_){
        newTab_ = null
        console.log("I am the new tab!");
        for (url in links_) {
          if(url != 0){
            chrome.tabs.create({ url : links_[url], active: false});
          }
        }
        links_ = null
      }
  }
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
