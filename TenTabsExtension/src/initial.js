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
var tabCountTextBox = document.getElementById("tabNumber");
var tabsLabel = document.getElementById("tabsLabel");
var questionMarkLabel = document.getElementById("questionMark");

const NUMBERS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
slider.oninput = function() {
   chrome.storage.local.set({'numTabs':this.value})
   tabCountTextBox.textContent = NUMBERS[this.value-1];
   if (this.value == 1) {
      tabsLabel.textContent = "tab";
      questionMarkLabel.style.visibility = "visible";
   } else {
      tabsLabel.textContent = "tabs";
      questionMarkLabel.style.visibility = "hidden";
   }
}

chrome.storage.local.set({'numTabs':null})