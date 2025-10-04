// background.js
chrome.commands.onCommand.addListener(cmd => {
  if (cmd === 'open-popup') {
    chrome.windows.getCurrent(win => {
      chrome.action.openPopup();
    });
  }
});