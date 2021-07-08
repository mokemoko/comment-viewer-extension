browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

browser.tabs.onUpdated.addListener(async (tabId) => {
  console.log("onUpdated")
  browser.pageAction.show(tabId)
  chrome.tabs.sendMessage(tabId, "toggle_sidebar")
})
