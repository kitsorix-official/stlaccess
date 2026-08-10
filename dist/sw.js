/**
 * STLACCESS Service Worker
 * Generated at build time by scripts/pwa-integration.mjs — do not edit dist/sw.js.
 *
 * 81940429b68c is the hash of this build's precache manifest. Any content
 * change produces new sw.js bytes, which the browser detects on the next page
 * load and stages as a "waiting" worker. The page then shows an update prompt
 * (see public/js/pwa-register.js) and only activates the new version when the
 * user clicks Refresh — never force-refreshing mid-session.
 */

var SW_VERSION = "81940429b68c";
var CACHE_NAME = "stlaccess-" + SW_VERSION;
var PRECACHE_URLS = ["/404.html","/9dbd07f275014956985b10cb375fe465.txt","/BingSiteAuth.xml","/_astro/global.DLGl1zAp.css","/about.html","/apple-touch-icon.png","/contact.html","/faq.html","/favicon.ico","/favicon.svg","/games.html","/guides.html","/guides/175cm-baseline.html","/guides/chitubox-lychee-scaling-guide.html","/guides/fdm-miniature-printing-guide.html","/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-32mm.html","/guides/upscaling-3d-prints-detail-limit.html","/index.html","/js/mathscaler.js","/js/observatory.js","/js/pwa-register.js","/legal.html","/llm.txt","/manifest.webmanifest","/og-image.svg","/privacy.html","/pwa-192x192.png","/pwa-512x512.png","/pwa-maskable-512x512.png","/reference.html","/robots.txt","/rss.xml","/sitemap.xml","/stlaccess-social-banner.png","/terms.html","/tools.html","/tools/filament-cost-calculator.html","/tools/real-world-scale-converter.html","/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator.html","/urls.txt"];
var NAV_MAP = {"/404":"/404.html","/404/":"/404.html","/about":"/about.html","/about/":"/about.html","/contact":"/contact.html","/contact/":"/contact.html","/faq":"/faq.html","/faq/":"/faq.html","/games":"/games.html","/games/":"/games.html","/guides":"/guides.html","/guides/":"/guides.html","/guides/175cm-baseline":"/guides/175cm-baseline.html","/guides/175cm-baseline/":"/guides/175cm-baseline.html","/guides/chitubox-lychee-scaling-guide":"/guides/chitubox-lychee-scaling-guide.html","/guides/chitubox-lychee-scaling-guide/":"/guides/chitubox-lychee-scaling-guide.html","/guides/fdm-miniature-printing-guide":"/guides/fdm-miniature-printing-guide.html","/guides/fdm-miniature-printing-guide/":"/guides/fdm-miniature-printing-guide.html","/guides/how-to-measure-miniature-scale":"/guides/how-to-measure-miniature-scale.html","/guides/how-to-measure-miniature-scale/":"/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-32mm":"/guides/real-world-objects-to-32mm.html","/guides/real-world-objects-to-32mm/":"/guides/real-world-objects-to-32mm.html","/guides/upscaling-3d-prints-detail-limit":"/guides/upscaling-3d-prints-detail-limit.html","/guides/upscaling-3d-prints-detail-limit/":"/guides/upscaling-3d-prints-detail-limit.html","/":"/index.html","/legal":"/legal.html","/legal/":"/legal.html","/privacy":"/privacy.html","/privacy/":"/privacy.html","/reference":"/reference.html","/reference/":"/reference.html","/terms":"/terms.html","/terms/":"/terms.html","/tools":"/tools.html","/tools/":"/tools.html","/tools/filament-cost-calculator":"/tools/filament-cost-calculator.html","/tools/filament-cost-calculator/":"/tools/filament-cost-calculator.html","/tools/real-world-scale-converter":"/tools/real-world-scale-converter.html","/tools/real-world-scale-converter/":"/tools/real-world-scale-converter.html","/tools/reference-bar-generator":"/tools/reference-bar-generator.html","/tools/reference-bar-generator/":"/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator":"/tools/slicer-percentage-calculator.html","/tools/slicer-percentage-calculator/":"/tools/slicer-percentage-calculator.html"};

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return Promise.allSettled(
          PRECACHE_URLS.map(function (url) {
            return cache.add(url);
          })
        );
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key.indexOf("stlaccess-") === 0 && key !== CACHE_NAME;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url = new URL(request.url);
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  // Cross-origin (Font Awesome, Google Fonts): runtime cache-first so the
  // site stays styled while offline. Cache opaque responses too.
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.match(request).then(function (cached) {
        if (cached) return cached;
        return fetch(request).then(function (response) {
          if (response && (response.ok || response.type === "opaque")) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation: network-first, precache fallback for offline. Fresh HTML
  // while online, cached copy when there is no connection.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response && response.ok) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          return offlineNavigation(request);
        })
    );
    return;
  }

  // Same-origin static assets: precache-first, then network.
  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});

function offlineNavigation(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    var pathname = new URL(request.url).pathname;
    var target = NAV_MAP[pathname];

    if (!target && pathname !== "/" && !pathname.endsWith("/")) {
      target = pathname + ".html";
    }

    if (target) {
      return cache
        .match(target)
        .then(function (hit) {
          if (hit) return hit;
          return cache.match("/index.html");
        })
        .then(function (hit) {
          if (hit) return hit;
          return new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        });
    }

    return cache
      .match("/index.html")
      .then(function (hit) {
        if (hit) return hit;
        return new Response("Offline", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      });
  });
}
