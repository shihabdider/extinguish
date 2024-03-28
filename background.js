let blocklist = [];
let probabilityOfPassThrough = 0.0;
let waitTimeBetweenRetries = 0; // in milliseconds
let lastAttemptTime = {}; // Store the last attempt time for each blocked domain

// Load settings from storage
chrome.storage.sync.get(['blocklist', 'probabilityOfPassThrough', 'waitTimeBetweenRetries'], function(result) {
    blocklist = result.blocklist || [];
    probabilityOfPassThrough = result.probabilityOfPassThrough || 0.0;
    waitTimeBetweenRetries = result.waitTimeBetweenRetries || 0;
});

// Listen for changes in the options and update accordingly
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        if (key === 'blocklist') {
            blocklist = storageChange.newValue;
        } else if (key === 'probabilityOfPassThrough') {
            probabilityOfPassThrough = storageChange.newValue;
        } else if (key === 'waitTimeBetweenRetries') {
            waitTimeBetweenRetries = storageChange.newValue;
        }
    }
});

// Redirect to block page if the website is in the blocklist
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        let url = new URL(details.url);
        let domain = url.hostname;

        if (blocklist.includes(domain)) {
            let currentTime = Date.now();
            let lastTime = lastAttemptTime[domain] || 0;

            if (currentTime - lastTime > waitTimeBetweenRetries) {
                lastAttemptTime[domain] = currentTime;
                if (Math.random() < probabilityOfPassThrough) {
                    // Allow the request to proceed
                    return { cancel: false };
                } else {
                    // Redirect to the block page
                    return { redirectUrl: chrome.runtime.getURL("block.html") };
                }
            } else {
                // Redirect to the block page because the wait time has not passed
                return { redirectUrl: chrome.runtime.getURL("block.html") };
            }
        }
        return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
