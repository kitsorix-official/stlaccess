/**
 * faq-search.js — FAQ search with auto-expand and category visibility
 * Self-contained — no external dependencies.
 */
(function () {
  var searchInput = document.getElementById("faq-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    var query = this.value.toLowerCase().trim();
    var categories = document.querySelectorAll(".category-block");
    var faqs = document.querySelectorAll(".faq-item");

    faqs.forEach(function (faq) {
      var question = (faq.querySelector("summary") || {}).textContent || "";
      var answer = (faq.querySelector(".faq-answer") || faq.querySelector(".answer-body") || {}).textContent || "";
      var matches = question.toLowerCase().indexOf(query) !== -1 || answer.toLowerCase().indexOf(query) !== -1;

      if (matches) {
        faq.style.display = "";
        if (query.length > 2) faq.setAttribute("open", "");
        else faq.removeAttribute("open");
      } else {
        faq.style.display = "none";
        faq.removeAttribute("open");
      }
    });

    categories.forEach(function (cat) {
      var visible = cat.querySelectorAll(".faq-item");
      var hasVisible = false;
      visible.forEach(function (f) { if (f.style.display !== "none") hasVisible = true; });
      cat.style.display = hasVisible ? "" : "none";
    });
  });
})();
