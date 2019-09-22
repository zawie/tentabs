// Close the current tab when the search button is clicked
document.addEventListener('DOMContentLoaded', function() {
   var searchForm = document.getElementsByName('searchform')[0];
   searchForm.addEventListener('submit', function() {
      chrome.storage.local.set({'searched': true});
      chrome.storage.local.set({'newTab':null, 'links':null})
      chrome.tabs.getCurrent(function(tab) {
          chrome.tabs.remove(tab.id, function(){});
       });
   }, false);
}, false);

var slider = document.getElementById("tabSlider");
//var tabCountDisplay = document.getElementById("tabCount")
// TODO: save slider value
slider.oninput = function() {
   //tabCountDisplay.innerHTML = this.value
   chrome.storage.local.set({'numTabs':this.value}, function(){
      console.log("Storage was updated with " + this.value)
   })
   chrome.storage.local.get('numTabs', function(result){
      console.log(result.numTabs)
   })
 }

 chrome.storage.local.set({'numTabs':null})