/**
 * mathscaler.js — STLACCESS Scale Engine
 * Client-side scale calculator with URL deep-linking.
 * Reads scale data from window.STLACCESS_SCALES (injected by build script).
 * Self-contained — no external dependencies.
 */
(function () {
  var SCALES = window.STLACCESS_SCALES || {};

  var srcSel = document.getElementById("source-scale");
  var tgtSel = document.getElementById("target-scale");
  var topHead = document.getElementById("use-top-head");
  var matComp = document.getElementById("material-comp");
  var shrinkRate = document.getElementById("shrinkage-rate");
  var resultEl = document.getElementById("result-value");
  var copyBtn = document.getElementById("copy-result");

  if (!srcSel || !tgtSel || !resultEl) return;

  function calculate() {
    var src = SCALES[srcSel.value];
    var tgt = SCALES[tgtSel.value];
    if (!src || !tgt) return;

    var srcMm = topHead && topHead.checked ? src.top : src.eye;
    var tgtMm = topHead && topHead.checked ? tgt.top : tgt.eye;
    var pct = (tgtMm / srcMm) * 100;

    if (matComp && matComp.checked && shrinkRate) {
      var rate = parseFloat(shrinkRate.value) || 0;
      pct += rate;
    } else if (matComp && matComp.checked) {
      pct *= 1.005;
    }

    resultEl.textContent = pct.toFixed(1);
  }

  srcSel.addEventListener("change", calculate);
  tgtSel.addEventListener("change", calculate);
  if (topHead) topHead.addEventListener("change", calculate);
  if (matComp) matComp.addEventListener("change", calculate);
  if (shrinkRate) shrinkRate.addEventListener("input", calculate);

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = resultEl.textContent + "%";
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = "Copied!";
        setTimeout(function () {
          copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
        }, 1500);
      });
    });
  }

  function checkURLParams() {
    var params = new URLSearchParams(window.location.search);
    var source = params.get("source");
    var target = params.get("target");
    var logic = params.get("logic");
    var shrinkage = params.get("shrinkage");
    var rate = params.get("rate");

    if (source && SCALES[source]) srcSel.value = source;
    if (target && SCALES[target]) {
      var opts = Array.prototype.slice.call(tgtSel.options);
      if (opts.some(function (o) { return o.value === target; })) {
        tgtSel.value = target;
      }
    }
    if (logic === "head" && topHead) topHead.checked = true;
    if (shrinkage === "true" && matComp) matComp.checked = true;
    if (rate && shrinkRate) shrinkRate.value = rate;
    calculate();
  }

  window.addEventListener("DOMContentLoaded", checkURLParams);
  calculate();
})();
