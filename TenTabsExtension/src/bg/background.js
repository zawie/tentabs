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

// Run the parser and tabber if the new tab is a google search
function onNewTab(tab) {
  console.log("SCANNING");
  // TODO: check chrome store variable to only load tabs when
  // tentabs loaded the google page
  if (tab.url.startsWith("https://google.com/search")) {
    console.log("SEARCH LOADED");
  }
}
chrome.tabs.onCreated.addListener(onNewTab);