document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('options-form').addEventListener('submit', saveOptions);

function loadOptions() {
    chrome.storage.sync.get({
        blocklist: '',
        probability: 100,
        retryTime: 2 
    }, function(items) {
        document.getElementById('blocklist').value = items.blocklist;
        document.getElementById('probability').value = items.probability;
        document.getElementById('retry-time').value = items.retryTime;
    });
}

function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        blocklist: document.getElementById('blocklist').value,
        probability: document.getElementById('probability').value,
        retryTime: document.getElementById('retry-time').value
    }, function() {
        // Update status to let user know options were saved.
        var status = document.createElement('div');
        status.textContent = 'Options saved.';
        document.body.appendChild(status);
        setTimeout(function() {
            status.remove();
        }, 750);
    });
}
