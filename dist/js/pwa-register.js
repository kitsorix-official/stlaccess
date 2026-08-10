/**
 * STLACCESS PWA registration + update prompt
 * Registers the build-generated service worker and shows a toast when a new
 * version is staged. The new worker stays "waiting" until the user clicks
 * Refresh — nothing is force-refreshed mid-session. Runs on every page load;
 * the browser's SW update check on registration is the only update trigger.
 */
(function () {
  if (!('serviceWorker' in navigator)) return;
  if (
    location.protocol !== 'https:' &&
    location.hostname !== 'localhost' &&
    location.hostname !== '127.0.0.1'
  ) {
    return;
  }

  var refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      // No existing controller = first visit; nothing to prompt about yet.
      if (!navigator.serviceWorker.controller) return;

      function watchStagedWorker(worker) {
        if (worker.state === 'installed') {
          promptForUpdate(worker);
          return;
        }
        worker.addEventListener('statechange', function () {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            promptForUpdate(worker);
          }
        });
      }

      function checkForUpdate() {
        if (registration.waiting) {
          promptForUpdate(registration.waiting);
        } else if (registration.installing) {
          watchStagedWorker(registration.installing);
        }
      }

      registration.addEventListener('updatefound', checkForUpdate);
      checkForUpdate();
    })
    .catch(function () {
      // No service worker available (dev/preview without a build) — ignore.
    });

  function promptForUpdate(worker) {
    var existing = document.getElementById('pwa-toast');
    var toast = existing || buildToast();
    toast.hidden = false;

    var refreshBtn = toast.querySelector('.pwa-refresh');
    refreshBtn.onclick = function () {
      refreshBtn.disabled = true;
      worker.postMessage({ type: 'SKIP_WAITING' });
    };
    toast.querySelector('.pwa-dismiss').onclick = function () {
      toast.hidden = true;
    };
  }

  function buildToast() {
    var toast = document.createElement('div');
    toast.id = 'pwa-toast';
    toast.className = 'pwa-toast';
    toast.hidden = true;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    var text = document.createElement('p');
    text.textContent = 'A new version of STLACCESS is available.';

    var refreshBtn = document.createElement('button');
    refreshBtn.type = 'button';
    refreshBtn.className = 'pwa-refresh';
    refreshBtn.textContent = 'Refresh';

    var dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.className = 'pwa-dismiss';
    dismissBtn.setAttribute('aria-label', 'Dismiss');
    dismissBtn.textContent = '\u00d7';

    toast.appendChild(text);
    toast.appendChild(refreshBtn);
    toast.appendChild(dismissBtn);
    document.body.appendChild(toast);
    return toast;
  }
})();
