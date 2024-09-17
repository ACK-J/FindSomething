// When the "save" button is clicked
document.getElementById("save").onclick = function () {
    let webhook_setting = {};
    // Get values from input fields and store them in the webhook_setting object
    webhook_setting['url'] = document.getElementById('url').value;
    webhook_setting['method'] = document.getElementById('method').value;
    webhook_setting['arg'] = document.getElementById('arg').value;
    webhook_setting['headers'] = JSON.parse(document.getElementById('headers').value);
    // Save the webhook_setting object to local storage
    chrome.storage.local.set({"webhook_setting": webhook_setting});
}

// When the "reset" button is clicked
document.getElementById("reset").onclick = function () {
    // Reset the webhook_setting object to default values
    let webhook_setting = {"url": "", "arg": "", "headers": {}};
    // Clear input fields
    document.getElementById('url').value = "";
    document.getElementById('arg').value = "";
    document.getElementById('headers').value = "{}";
    // Save the reset webhook_setting object to local storage
    chrome.storage.local.set({"webhook_setting": webhook_setting});
}

// When the "save_allowlist" button is clicked
document.getElementById("save_allowlist").onclick = function () {
    // Split the allowlist input into an array, removing empty items
    snsArr = document.getElementById('allowlist').value.split(/[(\r\n)\r\n]+/);
    snsArr.forEach((item, index) => {
        if (!item) {
            snsArr.splice(index, 1);
        }
    });
    // Save the allowlist array to local storage
    chrome.storage.local.set({"allowlist": snsArr});
}

// When the "reset_allowlist" button is clicked
document.getElementById("reset_allowlist").onclick = function () {
    // Clear the allowlist input field
    document.getElementById('allowlist').value = "";
    // Save an empty array to local storage for the allowlist
    chrome.storage.local.set({"allowlist": []});
}

// When the "clear_localStorage" button is clicked
document.getElementById("clear_localStorage").onclick = function () {
    // Clear all data from local storage
    chrome.storage.local.clear();
    console.log("Clearing completed");
    alert("Clearing completed");
}

// When the "global_float" button is clicked
document.getElementById("global_float").onclick = function () {
    // Get the current value of global_float from local storage
    chrome.storage.local.get(["global_float"], function(settings) {
        // Toggle the value of global_float and save it back to local storage
        chrome.storage.local.set({"global_float": settings["global_float"] == true ? false : true});
        // Update the button text based on the new value
        document.getElementById('global_float').textContent = settings["global_float"] == true ? "Closed" : "Opened";
    });
}

// When the "fetch_timeout" button is clicked
document.getElementById("fetch_timeout").onclick = function () {
    // Get the current value of fetch_timeout from local storage
    chrome.storage.local.get(["fetch_timeout"], function(settings) {
        // Toggle the value of fetch_timeout and save it back to local storage
        chrome.storage.local.set({"fetch_timeout": settings["fetch_timeout"] == true ? false : true});
        // Update the button text based on the new value
        document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"] == true ? "Closed" : "Opened";
    });
}

// Retrieve and populate the webhook_setting from local storage on page load
chrome.storage.local.get(["webhook_setting"], function(settings) {
    console.log(settings);
    if (!settings || settings == {} || !settings["webhook_setting"]) {
        console.log('Failed to retrieve webhook_setting');
        return;
    }
    // Populate input fields with the retrieved values
    document.getElementById('url').value = settings["webhook_setting"]['url'];
    document.getElementById('method').value = settings["webhook_setting"]['method'];
    document.getElementById('arg').value = settings["webhook_setting"]['arg'];
    document.getElementById('headers').value = JSON.stringify(settings["webhook_setting"]['headers']);
});

// Retrieve and update the global_float button text on page load
chrome.storage.local.get(["global_float"], function(settings) {
    document.getElementById('global_float').textContent = settings["global_float"] == true ? "Opened" : "Closed";
});

// Retrieve and update the fetch_timeout button text on page load
chrome.storage.local.get(["fetch_timeout"], function(settings) {
    document.getElementById('fetch_timeout').textContent = settings["fetch_timeout"] == true ? "Opened" : "Closed";
});

// Retrieve and populate the allowlist from local storage on page load
chrome.storage.local.get(["allowlist"], function(allowlist) {
    if (allowlist && allowlist["allowlist"]) {
        document.getElementById('allowlist').textContent = allowlist["allowlist"].join('\n');
    }
});
