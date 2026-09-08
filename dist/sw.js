/**
 * STLACCESS Service Worker
 * Generated at build time by scripts/pwa-integration.mjs — do not edit dist/sw.js.
 *
 * 34a52e862566 is the hash of this build's precache manifest. Any content
 * change produces new sw.js bytes, which the browser detects on the next page
 * load and stages as a "waiting" worker. The page then shows an update prompt
 * (see public/js/pwa-register.js) and only activates the new version when the
 * user clicks Refresh — never force-refreshing mid-session.
 */

var SW_VERSION = "34a52e862566";
var CACHE_NAME = "stlaccess-" + SW_VERSION;
var PRECACHE_URLS = ["/404.html","/9dbd07f275014956985b10cb375fe465.txt","/BingSiteAuth.xml","/_astro/client.D9vVWfjN.js","/_astro/global.CCDkxvqV.css","/about.html","/apple-touch-icon.png","/contact.html","/faq.html","/favicon.ico","/favicon.svg","/fdm-printing-profiles.html","/guides.html","/guides/175cm-baseline.html","/guides/28mm-to-32mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion.html","/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/best-budget-3d-printers-wargaming.html","/guides/chitubox-lychee-scaling-guide.html","/guides/classic-fantasy-rpg-miniature-scale-guide.html","/guides/cura-tree-support-settings-miniatures.html","/guides/fdm-miniature-printing-guide.html","/guides/fdm-vs-resin-miniatures.html","/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-32mm.html","/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/sci-fi-mass-battle-35mm-scale-guide.html","/guides/upscaling-3d-prints-detail-limit.html","/index.html","/js/mathscaler.js","/js/observatory.js","/js/pwa-register.js","/legal.html","/llms.txt","/manifest.webmanifest","/miniature-size-chart.html","/privacy.html","/pwa-192x192.png","/pwa-512x512.png","/pwa-maskable-512x512.png","/robots.txt","/rss.xml","/sitemap.xml","/terms.html","/tools.html","/tools/filament-cost-calculator.html","/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator.html","/urls.txt","https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/3.46.0/tabler-icons.min.css"];
var NAV_MAP = {"/404":"/404.html","/404/":"/404.html","/about":"/about.html","/about/":"/about.html","/contact":"/contact.html","/contact/":"/contact.html","/faq":"/faq.html","/faq/":"/faq.html","/fdm-printing-profiles":"/fdm-printing-profiles.html","/fdm-printing-profiles/":"/fdm-printing-profiles.html","/guides":"/guides.html","/guides/":"/guides.html","/guides/175cm-baseline":"/guides/175cm-baseline.html","/guides/175cm-baseline/":"/guides/175cm-baseline.html","/guides/28mm-to-32mm-scale-conversion":"/guides/28mm-to-32mm-scale-conversion.html","/guides/28mm-to-32mm-scale-conversion/":"/guides/28mm-to-32mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion":"/guides/32mm-to-28mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion/":"/guides/32mm-to-28mm-scale-conversion.html","/guides/arachne-vs-classic-wall-generator-miniatures":"/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/arachne-vs-classic-wall-generator-miniatures/":"/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/best-budget-3d-printers-wargaming":"/guides/best-budget-3d-printers-wargaming.html","/guides/best-budget-3d-printers-wargaming/":"/guides/best-budget-3d-printers-wargaming.html","/guides/chitubox-lychee-scaling-guide":"/guides/chitubox-lychee-scaling-guide.html","/guides/chitubox-lychee-scaling-guide/":"/guides/chitubox-lychee-scaling-guide.html","/guides/classic-fantasy-rpg-miniature-scale-guide":"/guides/classic-fantasy-rpg-miniature-scale-guide.html","/guides/classic-fantasy-rpg-miniature-scale-guide/":"/guides/classic-fantasy-rpg-miniature-scale-guide.html","/guides/cura-tree-support-settings-miniatures":"/guides/cura-tree-support-settings-miniatures.html","/guides/cura-tree-support-settings-miniatures/":"/guides/cura-tree-support-settings-miniatures.html","/guides/fdm-miniature-printing-guide":"/guides/fdm-miniature-printing-guide.html","/guides/fdm-miniature-printing-guide/":"/guides/fdm-miniature-printing-guide.html","/guides/fdm-vs-resin-miniatures":"/guides/fdm-vs-resin-miniatures.html","/guides/fdm-vs-resin-miniatures/":"/guides/fdm-vs-resin-miniatures.html","/guides/how-to-measure-miniature-scale":"/guides/how-to-measure-miniature-scale.html","/guides/how-to-measure-miniature-scale/":"/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-28mm":"/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-28mm/":"/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-32mm":"/guides/real-world-objects-to-32mm.html","/guides/real-world-objects-to-32mm/":"/guides/real-world-objects-to-32mm.html","/guides/resin2fdm-convert-stl-to-fdm-ready":"/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/resin2fdm-convert-stl-to-fdm-ready/":"/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/sci-fi-mass-battle-35mm-scale-guide":"/guides/sci-fi-mass-battle-35mm-scale-guide.html","/guides/sci-fi-mass-battle-35mm-scale-guide/":"/guides/sci-fi-mass-battle-35mm-scale-guide.html","/guides/upscaling-3d-prints-detail-limit":"/guides/upscaling-3d-prints-detail-limit.html","/guides/upscaling-3d-prints-detail-limit/":"/guides/upscaling-3d-prints-detail-limit.html","/":"/index.html","/legal":"/legal.html","/legal/":"/legal.html","/miniature-size-chart":"/miniature-size-chart.html","/miniature-size-chart/":"/miniature-size-chart.html","/privacy":"/privacy.html","/privacy/":"/privacy.html","/terms":"/terms.html","/terms/":"/terms.html","/tools":"/tools.html","/tools/":"/tools.html","/tools/filament-cost-calculator":"/tools/filament-cost-calculator.html","/tools/filament-cost-calculator/":"/tools/filament-cost-calculator.html","/tools/reference-bar-generator":"/tools/reference-bar-generator.html","/tools/reference-bar-generator/":"/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator":"/tools/slicer-percentage-calculator.html","/tools/slicer-percentage-calculator/":"/tools/slicer-percentage-calculator.html"};

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
