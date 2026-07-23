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
