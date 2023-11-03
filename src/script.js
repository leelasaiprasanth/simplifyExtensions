// script.js

function showExtensions(filter) {
  chrome.management.getAll((extensions) => {
    const extensionList = document.getElementById("extension-list");
    extensionList.innerHTML = ""; // Clear the list before repopulating it.

    // Sort the extensions alphabetically by name
    extensions.sort((a, b) => a.name.localeCompare(b.name));

    extensions.forEach((extension) => {
      if (
        filter === "all" ||
        (filter === "enabled" && extension.enabled) ||
        (filter === "disabled" && !extension.enabled)
      ) {
        const listArray = document.createElement("li");
        const icon = document.createElement("img");
        icon.src = extension.icons[extension.icons.length - 1].url; // Use the last icon in the array
        const name = document.createElement("span");
        name.textContent = extension.name;

        // Create a toggle switch
        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.id = `toggle-${extension.id}`; // Use a unique ID for each toggle
        toggle.checked = extension.enabled;

        // // Create a button to open settings
        // const settingsButton = document.createElement("button");
        // settingsButton.textContent = "S";
        // settingsButton.addEventListener("click", () => {
        //   // Open the settings page in a new tab
        //   chrome.tabs.create({
        //     url: chrome.runtime.getURL(extension.optionsUrl),
        //   });
        // });

        // Handle individual extension item clicks to toggle the state
        listArray.addEventListener("click", () => {
          const newState = !extension.enabled;
          chrome.management.setEnabled(extension.id, newState, () => {
            showExtensions(filter); // Refresh the list to reflect changes
          });
        });

        listArray.appendChild(toggle);
        listArray.appendChild(icon);
        listArray.appendChild(name);
        // listArray.appendChild(settingsButton);
        // listArray.textContent = extension.name;
        extensionList.appendChild(listArray);
      }
    });
  });
}

document.getElementById("settings-button").addEventListener("click", () => {
  chrome.tabs.create({ url: "src/app/options.html" }); // Open the options page in a new tab
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      menuItems.forEach((item) => item.classList.remove("active"));
      menuItem.classList.add("active");
      showExtensions(menuItem.id);
    });
  });

  // Show All extensions by default.
  showExtensions("all");
});
