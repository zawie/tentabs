// Close the current tab when the search button is clicked
document.addEventListener('DOMContentLoaded', function() {
   var searchForm = document.getElementsByName('searchform')[0];
   searchForm.addEventListener('submit', function() {
      chrome.storage.local.set({'searched': true});
      chrome.tabs.getCurrent(function(tab) {
          chrome.tabs.remove(tab.id, function(){});
       });
   }, false);
}, false);
