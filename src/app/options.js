// options.js

document.addEventListener("DOMContentLoaded", () => {
  const logList = document.getElementById("log-list");

  // Request extension actions from the background page
  chrome.runtime.sendMessage({ action: "getExtensionActions" }, (response) => {
    if (response.action === "updateExtensionActions") {
      const extensionActions = response.extensionActions;
      logList.innerHTML = ""; // Clear the list before repopulating it
      extensionActions.forEach((actionText) => {
        const logItem = document.createElement("li");
        logItem.textContent = actionText;
        logList.appendChild(logItem);
      });
    }
  });
});
