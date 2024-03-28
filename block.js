document.addEventListener('DOMContentLoaded', function() {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex].quote;
            const source = quotes[randomIndex].source;
            document.getElementById('quote').innerHTML = quote;
            document.getElementById('quote').setAttribute('data-source', source);
        })
        .catch(error => console.error('Error loading quotes:', error));

    var candle = document.getElementById('candle');
    candle.addEventListener('animationend', function() {
        document.getElementById('quote').style.opacity = 1;
    });
});
