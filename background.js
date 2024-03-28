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

// Update the declarativeNetRequest rules based on the blocklist
function updateRules() {
    // Remove any existing rules
    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] }, () => {
        // Add new rules based on the blocklist
        let rules = blocklist.map((domain, index) => {
            return {
                id: index + 1,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: { url: chrome.runtime.getURL("block.html") }
                },
                condition: {
                    urlFilter: domain,
                    resourceTypes: ['main_frame']
                }
            };
        });

        chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules }, () => {
            console.log('Declarative Net Request rules updated.');
        });
    });
}

// Call updateRules when the blocklist changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        if (key === 'blocklist') {
            blocklist = storageChange.newValue;
            updateRules();
        }
    }
});

// Initialize rules on startup
updateRules();
