// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

// import { parseText } from './parseText.js';
// import { openLinks } from './tabber.js';

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "TenTabs.html";
    chrome.windows.create({url: chrome.extension.getURL('TenTabs.html') });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url != null) {
    if (changeInfo.url.startsWith("https://www.google.com/search") || 
        changeInfo.url.startsWith("http://www.google.com/search")) {
      // Add check for chrome stored flag
      console.log("Search page created");
      // openLinks(parseText());
    }
  }
}); 
