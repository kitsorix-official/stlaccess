/**
 * guide-search.js — Client-side search for guide cards
 * Self-contained — no external dependencies.
 */
(function () {
  var input = document.getElementById("guide-search");
  var cards = document.querySelectorAll("#guide-list .card");
  if (!input || !cards.length) return;

  input.addEventListener("input", function () {
    var q = this.value.toLowerCase().trim();
    cards.forEach(function (c) {
      var txt = c.getAttribute("data-search").toLowerCase();
      c.style.display = txt.includes(q) ? "" : "none";
    });
  });
})();
