const quotes = [
  {
    "quote": "Though one may conquer a thousand times a thousand men in battle, the noblest victor is the one who conquers himself.",
    "source": "--Dhammapada, verse 103"
  },
  {
    "quote": "He trains himself, having undertaken the training rules, seeing danger in the slightest fault. This is called the training in heightened virtue.",
    "source": "--AN 3.88"
  },
  {
    "quote": "All is burning. What the all that is burning? The eye is burning. Forms are burning. Consciousness at the eye is burning. Contact at the eye is burning. And whatever there is that arises in dependence on contact at the eye — experienced as pleasure, pain or neither-pleasure-nor-pain — that too is burning.",
    "source": "--SN 35.28"
  }
]

document.addEventListener('DOMContentLoaded', function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex].quote;
    const source = quotes[randomIndex].source;
    document.getElementById('quote').innerHTML = quote;
    document.getElementById('source').innerHTML = source;
    document.getElementById('quote').setAttribute('data-source', source);

    var candle = document.getElementById('candle');
    candle.addEventListener('animationend', function() {
        document.getElementById('quote').style.opacity = 1;
        document.getElementById('source').style.opacity = 1;
    });
});
