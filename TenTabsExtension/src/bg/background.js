// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


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
  console.log(changeInfo.status === 'complete');
  if (changeInfo.status === 'complete'){
    console.log("Tab " +tabId+ " has finished loading")
  }
});
/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
 // how to fetch tab url using activeInfo.tabid
 chrome.tabs.get(activeInfo.tabId, function(tab){
    console.log(tab.url);
 });
}); 
*/