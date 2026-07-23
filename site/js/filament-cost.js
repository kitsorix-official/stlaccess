/**
 * filament-cost.js — Filament cost calculator
 * Standalone tool at /tools/filament-cost-calculator/
 * Self-contained — no external dependencies.
 */
(function () {
  var rollPrice = document.getElementById("roll-price");
  var rollWeight = document.getElementById("roll-weight");
  var filamentUsed = document.getElementById("filament-used");
  var costPerGram = document.getElementById("cost-per-gram");
  var powerDraw = document.getElementById("power-draw");
  var electricityRate = document.getElementById("electricity-rate");
  var printTime = document.getElementById("print-time");
  var costFilament = document.getElementById("cost-filament");
  var costElectricity = document.getElementById("cost-electricity");
  var costTotal = document.getElementById("cost-total");
  var costGpd = document.getElementById("cost-gpd");

  if (!rollPrice || !rollWeight || !filamentUsed) return;

  function update() {
    var rp = parseFloat(rollPrice.value) || 0;
    var rw = parseFloat(rollWeight.value) || 0;
    var used = parseFloat(filamentUsed.value) || 0;
    var power = parseFloat(powerDraw ? powerDraw.value : 0) || 0;
    var rate = parseFloat(electricityRate ? electricityRate.value : 0) || 0;
    var hours = parseFloat(printTime ? printTime.value : 0) || 0;

    var cpGram = rw > 0 ? rp / rw : 0;
    if (costPerGram) costPerGram.value = cpGram > 0 ? "$" + cpGram.toFixed(4) : "$0.0000";

    var filamentCost = cpGram * used;
    var elecCost = (power / 1000) * rate * hours;
    var total = filamentCost + elecCost;

    if (costFilament) costFilament.textContent = "$" + filamentCost.toFixed(2);
    if (costElectricity) costElectricity.textContent = "$" + elecCost.toFixed(2);
    if (costTotal) costTotal.textContent = "$" + total.toFixed(2);
    if (costGpd) costGpd.textContent = (used > 0 && total > 0) ? (used / total).toFixed(1) + "g" : "\u2014";
  }

  [rollPrice, rollWeight, filamentUsed, powerDraw, electricityRate, printTime].forEach(function (el) {
    if (el) el.addEventListener("input", update);
  });
  update();
})();
