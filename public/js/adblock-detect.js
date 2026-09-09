/**
 * Lightweight adblock detection via bait elements.
 * No cookies, no network requests, no fingerprinting.
 * Shows #adblock-banner if an adblocker is detected.
 * Dismiss state stored in sessionStorage (re-shows each new session).
 */
(function () {
  'use strict';

  var DISMISSED_KEY = 'stla-adblock-dismissed';
  var CHECK_DELAY = 1500;

  // Bail if already dismissed this session
  try {
    if (sessionStorage.getItem(DISMISSED_KEY) === '1') return;
  } catch (_) {
    // sessionStorage unavailable — continue and show banner
  }

  // Bail if banner element not in DOM
  var banner = document.getElementById('adblock-banner');
  if (!banner) return;

  // Create bait elements that adblocker filter lists commonly hide
  var baits = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('ins')
  ];

  baits[0].className = 'ad-unit';
  baits[1].className = 'adsbygoogle';
  baits[2].id = 'google_ads';
  baits[2].setAttribute('data-ad-client', 'ca-pub-0000000000');

  // Style them so they're invisible to users but visible to CSS-based blockers
  for (var i = 0; i < baits.length; i++) {
    baits[i].style.cssText =
      'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
    document.body.appendChild(baits[i]);
  }

  setTimeout(function () {
    var blocked = false;

    for (var i = 0; i < baits.length; i++) {
      try {
        if (window.getComputedStyle(baits[i]).display === 'none') {
          blocked = true;
          break;
        }
      } catch (_) {
        // getComputedStyle can throw on certain elements in old browsers
      }
    }

    // Clean up bait elements
    for (var i = 0; i < baits.length; i++) {
      if (baits[i].parentNode) baits[i].parentNode.removeChild(baits[i]);
    }

    if (blocked) {
      banner.removeAttribute('hidden');

      var dismissBtn = document.getElementById('adblock-dismiss-btn');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
          banner.setAttribute('hidden', '');
          try {
            sessionStorage.setItem(DISMISSED_KEY, '1');
          } catch (_) {}
        });
      }
    }
  }, CHECK_DELAY);
})();
