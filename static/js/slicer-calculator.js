/**
 * slicer-calculator.js — Freeform mm-to-mm percentage calculator
 * Standalone tool at /tools/slicer-percentage-calculator/
 * Self-contained — no external dependencies.
 */
(function () {
  var srcInput = document.getElementById("src-size");
  var tgtInput = document.getElementById("tgt-size");
  var pctDisplay = document.getElementById("calc-pct");
  var formulaDisplay = document.getElementById("calc-formula");
  var swapBtn = document.getElementById("swap-btn");
  var copyBtn = document.getElementById("copy-btn");

  if (!srcInput || !tgtInput || !pctDisplay) return;

  function update() {
    var src = parseFloat(srcInput.value);
    var tgt = parseFloat(tgtInput.value);
    if (!src || !tgt || src <= 0 || tgt <= 0) {
      pctDisplay.textContent = "\u2014";
      if (formulaDisplay) formulaDisplay.textContent = "Enter values above";
      return;
    }
    var pct = (tgt / src) * 100;
    pctDisplay.textContent = pct % 1 === 0 ? pct + "%" : pct.toFixed(1) + "%";
    if (formulaDisplay) formulaDisplay.textContent = tgt + " \u00F7 " + src + " \u00D7 100";
  }

  srcInput.addEventListener("input", update);
  tgtInput.addEventListener("input", update);

  document.querySelectorAll(".preset-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      srcInput.value = this.dataset.src;
      tgtInput.value = this.dataset.tgt;
      update();
    });
  });

  if (swapBtn) {
    swapBtn.addEventListener("click", function () {
      var tmp = srcInput.value;
      srcInput.value = tgtInput.value;
      tgtInput.value = tmp;
      update();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = pctDisplay.textContent;
      if (text && text !== "\u2014") {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = "Copied!";
          setTimeout(function () { copyBtn.textContent = "Copy"; }, 1500);
        });
      }
    });
  }

  update();
})();
