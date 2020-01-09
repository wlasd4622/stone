let goodsMap = {}
let speed = localStorage.getItem('speed') || 300;
console.log(`>>>>`, speed);
let count = 0
chrome.extension.onRequest.addListener(
  function (request, sender, sendResponse) {
    if (request.type === "setVideo") {
      console.log('setVideo', request);
      goodsMap[request.id] = request
      sendResponse({ data: '0' });
      count++
      console.log(`>>>>>>>>>>`, count);
    } else if (request.type === "getData") {
      sendResponse({ goodsMap });
    } else if (request.type === "getSpeed") {
      sendResponse({ speed });
    } else {
      sendResponse({});
    }
  });

function focusOrCreateTab(url) {
  chrome.windows.getAll({ "populate": true }, function (windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, { "selected": true });
    } else {
      chrome.tabs.create({ "url": url, "selected": true });
    }
  });
}

chrome.browserAction.onClicked.addListener(function (tab) {
  var manager_url = chrome.extension.getURL("../manager.html");
  focusOrCreateTab(manager_url);
});