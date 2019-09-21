// Close the current tab when the search button is clicked
document.addEventListener('DOMContentLoaded', function() {
   var searchForm = document.getElementById('searchForm');
   searchForm.addEventListener('onsubmit', function() {
      chrome.tabs.getCurrent(function(tab) {
         chrome.tabs.remove(tab.id, function(){});
      });
   }, false);
}, false);
