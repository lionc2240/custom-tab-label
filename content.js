let originalTitle = document.title;
let customTitle = '';
let observer = null;

// Hàm để bắt đầu theo dõi và ngăn trang web đổi tiêu đề
const startObserver = () => {
  if (observer) observer.disconnect(); // Ngắt observer cũ nếu có

  observer = new MutationObserver((mutations) => {
    // Nếu tiêu đề bị thay đổi thành một giá trị khác với tên tùy chỉnh
    if (document.title !== customTitle) {
      document.title = customTitle;
    }
  });

  const titleElement = document.querySelector('title');
  if (titleElement) {
    observer.observe(titleElement, { childList: true });
  }
};

// Lắng nghe các message từ popup hoặc background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'changeAndObserveTitle') {
    customTitle = request.title;
    document.title = customTitle;
    startObserver();
  } else if (request.action === 'resetTitleToUrl') {
    if (observer) {
      observer.disconnect(); // Dừng theo dõi
    }
    document.title = request.url; // Đặt tiêu đề thành URL theo yêu cầu
  }
});