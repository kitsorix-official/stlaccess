/**
 * reference-copy.js — Copy percentage button for reference detail pages
 * Self-contained — no external dependencies.
 */
(function () {
  document.querySelectorAll("[data-copy-pct]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pct = this.dataset.copyPct;
      var self = this;
      navigator.clipboard.writeText(pct).then(function () {
        var orig = self.textContent;
        self.textContent = "Copied!";
        setTimeout(function () { self.textContent = orig; }, 1500);
      });
    });
  });
})();
