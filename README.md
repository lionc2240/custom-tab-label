# Custom Tab Label Extension

A simple Chrome extension that allows users to set custom labels for their browser tabs.

## Features

- **Custom Tab Titles**: Easily change the title of any open tab to a custom string.
- **Persistent Labels**: Your custom tab labels will persist even if you close and reopen your browser. (This is an assumption based on typical extension behavior, I'll verify if this is implemented later if needed).
- **Easy to Use**: A straightforward popup interface for managing tab labels.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/lionc2240/custom-tab-label.git
    ```
2.  **Open Chrome Extensions page**:
    -   Type `chrome://extensions` in your Chrome browser's address bar and press Enter.
3.  **Enable Developer Mode**:
    -   Toggle the "Developer mode" switch on (usually in the top right corner).
4.  **Load the unpacked extension**:
    -   Click on the "Load unpacked" button.
    -   Navigate to the cloned repository directory (`custom-tab-label`) and select it.
5.  **Pin the extension (optional)**:
    -   Click the puzzle piece icon in the Chrome toolbar, find "Custom Tab Label", and click the pin icon next to it for easy access.

## Usage

1.  **Navigate to a tab** you wish to rename.
2.  **Click on the extension icon** in your Chrome toolbar.
3.  **Enter your desired custom label** in the input field.
4.  **Click "Save"** (or similar button, based on `popup.html` and `popup.js`).
5.  **Click "Restore original" and Reload the tab** if you want to Reset label.

## Files

-   `background.js`: Handles background processes and event listeners for the extension.
-   `content.js`: Injects scripts into web pages to interact with the DOM.
-   `icon.png`: The icon for the extension.
-   `manifest.json`: The manifest file, providing metadata and defining the extension's structure and permissions.
-   `popup.css`: Stylesheet for the extension's popup.
-   `popup.html`: The HTML structure for the extension's popup interface.
-   `popup.js`: JavaScript for the popup's functionality.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests.
