/**
 * The STLACCESS Scale Engine Core
 * Dynamic calculator — reads scale data from window.CALCULATOR_SCALES
 * injected by the Astro page at build time from src/data/scales.json.
 *
 * Eye-level mode: percentage = (targetStandard / sourceStandard) × 100
 *   - Ratio scales use topOfHeadMm as standard (ratio = total height)
 *   - Gaming/display scales use eyeLevelMm as standard
 *
 * Top-of-head mode: checks validated overrides first (from conversions.json),
 *   then falls back to (targetTopOfHeadMm / sourceStandard) × 100.
 */

function getScaleData() {
    var scales = window.CALCULATOR_SCALES || {};
    var headOverrides = window.CALCULATOR_HEAD_OVERRIDES || {};
    return { scales: scales, headOverrides: headOverrides };
}

function calculate() {
    var data = getScaleData();
    var scales = data.scales;
    var headOverrides = data.headOverrides;

    var source = document.getElementById('sourceScale').value;
    var target = document.getElementById('targetScale').value;
    var logic = document.querySelector('input[name="logic"]:checked').value;

    // Shrinkage Logic
    var useShrinkage = document.getElementById('useShrinkage').checked;
    var shrinkageRate = parseFloat(document.getElementById('shrinkageRate').value) || 0;
    var shrinkageContainer = document.getElementById('shrinkageInputContainer');

    if (useShrinkage) {
        shrinkageContainer.classList.remove('hidden');
    } else {
        shrinkageContainer.classList.add('hidden');
    }

    var sourceData = scales[source];
    var targetData = scales[target];
    if (!sourceData || !targetData) return;

    var result;
    var overrideKey = source + '_' + target;

    if (logic === 'head') {
        // Check for validated override from conversions.json
        if (headOverrides[overrideKey] !== undefined) {
            result = headOverrides[overrideKey];
        } else {
            // Fallback: use target's topOfHeadMm against source's standard
            result = (targetData.topOfHeadMm / sourceData.standardMm) * 100;
        }
    } else {
        // Eye-level mode: standard values (ratio=topOfHeadMm, gaming=eyeLevelMm)
        result = (targetData.standardMm / sourceData.standardMm) * 100;
    }

    // Apply Shrinkage Offset (additive)
    if (useShrinkage && shrinkageRate > 0) {
        result += shrinkageRate;
    }

    // Visual Update
    var display = document.getElementById('resultDisplay');
    display.textContent = result.toFixed(1) + '%';

    // Context line: source -> target · measurement logic (+ shrink when enabled)
    var contextEl = document.getElementById('resultContext');
    if (contextEl) {
        var logicLabel = logic === 'head' ? 'Top of Head' : 'Eye Level';
        var ctxText = source + ' \u2192 ' + target + ' \u00B7 ' + logicLabel;
        if (useShrinkage && shrinkageRate > 0) {
            ctxText += ' \u00B7 +' + shrinkageRate + '% shrink';
        }
        contextEl.textContent = ctxText;
    }

    // Formula line (only shown when it matches the actual math)
    var formulaEl = document.getElementById('resultFormula');
    if (formulaEl) {
        if (logic === 'eye') {
            formulaEl.textContent = targetData.standardMm.toFixed(1) + ' \u00F7 ' + sourceData.standardMm.toFixed(1) + ' \u00D7 100';
        } else if (headOverrides[overrideKey] !== undefined) {
            formulaEl.textContent = 'Validated by my test prints';
        } else {
            formulaEl.textContent = targetData.topOfHeadMm.toFixed(1) + ' \u00F7 ' + sourceData.standardMm.toFixed(1) + ' \u00D7 100';
        }
    }

    // Update Estimate Cost deep-link
    var costBtn = document.getElementById('estimateCostBtn');
    if (costBtn) {
        var params = new URLSearchParams();
        params.set('from', source);
        params.set('to', target);
        params.set('percent', result.toFixed(1));
        params.set('logic', logic);
        costBtn.href = '/tools/filament-cost-calculator?' + params.toString();
    }
}

// Attach listeners
document.querySelectorAll('select, input').forEach(function(el) {
    el.addEventListener('change', calculate);
    el.addEventListener('input', calculate);
});

// Swap source and target scales
var swapBtn = document.getElementById('swapScaleBtn');
if (swapBtn) {
    swapBtn.addEventListener('click', function() {
        var sourceScale = document.getElementById('sourceScale');
        var targetScale = document.getElementById('targetScale');
        var tmp = sourceScale.value;
        sourceScale.value = targetScale.value;
        targetScale.value = tmp;
        calculate();
    });
}

// Copy percentage to clipboard
var copyBtn = document.getElementById('copyPctBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', function() {
        var display = document.getElementById('resultDisplay');
        var text = display ? display.textContent : '';
        if (!text) return;
        navigator.clipboard.writeText(text).then(function() {
            var original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Copied!</span>';
            setTimeout(function() {
                copyBtn.innerHTML = original;
            }, 1500);
        }).catch(function() {});
    });
}

// URL Parameter Support for Deep Linking
function checkURLParams() {
    var data = getScaleData();
    var scales = data.scales;
    var params = new URLSearchParams(window.location.search);
    var source = params.get('source');
    var target = params.get('target');
    var logic = params.get('logic');
    var shrinkage = params.get('shrinkage');
    var rate = params.get('rate');

    if (source && scales[source]) {
        document.getElementById('sourceScale').value = source;
    }
    if (target && scales[target]) {
        var targetSelect = document.getElementById('targetScale');
        if ([].slice.call(targetSelect.options).some(function(opt) { return opt.value === target; })) {
            targetSelect.value = target;
        }
    }
    if (logic === 'eye' || logic === 'head') {
        var radio = document.querySelector('input[name="logic"][value="' + logic + '"]');
        if (radio) radio.checked = true;
    }

    if (shrinkage === 'true') {
        document.getElementById('useShrinkage').checked = true;
    }
    if (rate) {
        document.getElementById('shrinkageRate').value = rate;
    }

    calculate();
}

// Initial Run
window.addEventListener('DOMContentLoaded', checkURLParams);
