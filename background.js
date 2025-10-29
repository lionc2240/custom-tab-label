chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Chỉ chạy khi trang đã tải xong và có URL hợp lệ
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    const data = await chrome.storage.local.get(tab.url);
    const customTitle = data[tab.url];

    if (customTitle) {
      // Tiêm content script vào tab
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });

      // Gửi tên tùy chỉnh đến content script để áp dụng
      chrome.tabs.sendMessage(tabId, {
        action: 'changeAndObserveTitle',
        title: customTitle
      });
    }
  }
});