// Close the current tab when the search button is clicked
document.addEventListener('DOMContentLoaded', function() {
   var checkPageButton = document.getElementById('search_button');
   checkPageButton.addEventListener('click', function() {
      chrome.tabs.getCurrent(function(tab) {
         chrome.tabs.remove(tab.id, function(){});
      });
   }, false);
}, false);
