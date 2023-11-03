// Initialize extensionActions
const extensionActions = [];

console.log("BEGIN: Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleExtension") {
    const extensionId = request.extensionId;
    chrome.management.get(extensionId, (extensionInfo) => {
      if (extensionInfo.enabled) {
        chrome.management.setEnabled(extensionId, false, () => {
          const actionText = `Disabled extension '${extensionInfo.name}'`;
          extensionActions.push(actionText);
          console.log(actionText); // Log the action
          sendResponse({ status: "disabled", actionText });
        });
      } else {
        chrome.management.setEnabled(extensionId, true, () => {
          const actionText = `Enabled extension '${extensionInfo.name}'`;
          extensionActions.push(actionText);
          console.log(actionText); // Log the action
          sendResponse({ status: "enabled", actionText });
        });
      }
    });
  } else if (request.action === "getExtensionActions") {
    // Handle the request for extension actions
    sendResponse({ action: "updateExtensionActions", extensionActions });
  }
});
