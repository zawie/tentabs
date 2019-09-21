// Close the current tab when the search button is clicked
document.addEventListener('DOMContentLoaded', function() {
   var searchForm = document.getElementsByName('searchform')[0];
   searchForm.addEventListener('submit', function() {
      chrome.storage.local.set({'searched': true});
      chrome.storage.local.set({'newTab':null, 'links':null, 'numTabs':null})
      chrome.tabs.getCurrent(function(tab) {
          chrome.tabs.remove(tab.id, function(){});
       });
   }, false);
}, false);

var slider = document.getElementById("tabSlider");
var tabCountDisplay = document.getElementById("tabCount")
// TODO: save slider value
slider.oninput = function() {
   console.log(this.value);
   tabCountDisplay.innerHTML = this.value
   // output.innerHTML = this.value;
 }

