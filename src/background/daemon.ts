

export const daemon =() =>{


// Keep track of the active tab
let activeTab: chrome.tabs.Tab | null = null;

// Keep the service worker active by pinging the tab every minute
setInterval(() => {
  if (activeTab) {
    chrome.tabs.sendMessage(activeTab.id!, { type: 'ping' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message to tab:', chrome.runtime.lastError.message);
      }
    });
  }
}, 60000); // 1 minute interval

// Listen for tab updates to keep track of the active tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    activeTab = tab;
  }
});

// Listen for tab removal to clear the active tab reference
chrome.tabs.onRemoved.addListener((tabId) => {
  if (activeTab?.id === tabId) {
    activeTab = null;
  }
});


}