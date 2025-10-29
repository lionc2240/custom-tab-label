document.addEventListener('DOMContentLoaded', async () => {
  const titleInput = document.getElementById('title-input');
  const saveButton = document.getElementById('save-button');
  const restoreButton = document.getElementById('restore-button');

  // Lấy tab đang hoạt động
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;

  // Hàm kiểm tra và cập nhật trạng thái nút Lưu
  const validateInput = () => {
    saveButton.disabled = titleInput.value.trim() === '';
  };

  // Lấy tên đã lưu (nếu có) và hiển thị
  const data = await chrome.storage.local.get(url);
  if (data[url]) {
    titleInput.value = data[url];
    restoreButton.classList.remove('hidden'); // Hiển thị nút khôi phục
  } else {
    titleInput.value = tab.title;
  }

  // Kiểm tra trạng thái ban đầu và mỗi khi người dùng nhập
  validateInput();
  titleInput.addEventListener('input', validateInput);

  // Sự kiện khi nhấn nút "Lưu"
  saveButton.addEventListener('click', async () => {
    const newTitle = titleInput.value.trim();
    if (newTitle) {
      // Lưu tên mới vào storage
      await chrome.storage.local.set({ [url]: newTitle });

      // Tiêm content script để đảm bảo nó có thể nhận message
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });

      // Gửi message để content script thay đổi và theo dõi tiêu đề
      chrome.tabs.sendMessage(tab.id, {
        action: 'changeAndObserveTitle',
        title: newTitle
      });

      window.close();
    }
  });

  // Cho phép lưu bằng phím Enter
  titleInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !saveButton.disabled) {
      saveButton.click();
    }
  });

  // Sự kiện khi nhấn nút "Khôi phục"
  restoreButton.addEventListener('click', async () => {
    // Xóa tên tùy chỉnh đã lưu
    await chrome.storage.local.remove(url);

    // Yêu cầu content script đặt lại tiêu đề thành URL
    // Tiêm script trước để đảm bảo nó có thể nhận message
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
    chrome.tabs.sendMessage(tab.id, { action: 'resetTitleToUrl', url: tab.url });

    window.close();
  });
});
