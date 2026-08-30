/**
 * STLACCESS Service Worker
 * Generated at build time by scripts/pwa-integration.mjs — do not edit dist/sw.js.
 *
 * d5ee2602fc90 is the hash of this build's precache manifest. Any content
 * change produces new sw.js bytes, which the browser detects on the next page
 * load and stages as a "waiting" worker. The page then shows an update prompt
 * (see public/js/pwa-register.js) and only activates the new version when the
 * user clicks Refresh — never force-refreshing mid-session.
 */

var SW_VERSION = "d5ee2602fc90";
var CACHE_NAME = "stlaccess-" + SW_VERSION;
var PRECACHE_URLS = ["/404.html","/9dbd07f275014956985b10cb375fe465.txt","/BingSiteAuth.xml","/_astro/ScaleVisualizerApp.BRDXHZ7I.js","/_astro/client.COtTw1Rq.js","/_astro/client.CtuZIZB4.js","/_astro/global.C2eyMS2Z.css","/about.html","/apple-touch-icon.png","/contact.html","/faq.html","/favicon.ico","/favicon.svg","/games.html","/games/age-of-sigmar.html","/games/battletech.html","/games/bolt-action.html","/games/conquest.html","/games/dropzone-commander.html","/games/dungeons-and-dragons.html","/games/fallout-wasteland-warfare.html","/games/flames-of-war.html","/games/frostgrave-stargrave.html","/games/gaslands.html","/games/infinity.html","/games/kill-team.html","/games/kings-of-war.html","/games/legions-imperialis.html","/games/malifaux.html","/games/marvel-crisis-protocol.html","/games/middle-earth-strategy-battle-game.html","/games/necromunda.html","/games/one-page-rules-grimdark-future.html","/games/star-wars-legion.html","/games/star-wars-shatterpoint.html","/games/star-wars-x-wing.html","/games/warcry.html","/games/warhammer-40000.html","/games/warhammer-the-old-world.html","/games/warmachine-hordes.html","/guides.html","/guides/175cm-baseline.html","/guides/28mm-to-32mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion.html","/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/best-budget-3d-printers-wargaming.html","/guides/chitubox-lychee-scaling-guide.html","/guides/cura-tree-support-settings-miniatures.html","/guides/dnd-miniature-scale-guide.html","/guides/fdm-miniature-printing-guide.html","/guides/fdm-vs-resin-miniatures.html","/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-32mm.html","/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/star-wars-legion-scale-guide.html","/guides/upscaling-3d-prints-detail-limit.html","/index.html","/js/mathscaler.js","/js/observatory.js","/js/pwa-register.js","/legal.html","/llms.txt","/manifest.webmanifest","/og-image.svg","/privacy.html","/pwa-192x192.png","/pwa-512x512.png","/pwa-maskable-512x512.png","/reference.html","/reference/1-100-to-1-35.html","/reference/1-100-to-28mm.html","/reference/1-100-to-32mm.html","/reference/1-100-to-35mm.html","/reference/1-100-to-40mm.html","/reference/1-100-to-75mm.html","/reference/1-35-to-28mm.html","/reference/1-35-to-32mm.html","/reference/1-35-to-35mm.html","/reference/1-35-to-40mm.html","/reference/1-35-to-75mm.html","/reference/1-48-to-1-35.html","/reference/1-48-to-1-56.html","/reference/1-48-to-28mm.html","/reference/1-48-to-32mm.html","/reference/1-48-to-35mm.html","/reference/1-48-to-40mm.html","/reference/1-48-to-75mm.html","/reference/1-56-to-1-35.html","/reference/1-56-to-1-48.html","/reference/1-56-to-28mm.html","/reference/1-56-to-32mm.html","/reference/1-56-to-35mm.html","/reference/1-56-to-40mm.html","/reference/1-56-to-75mm.html","/reference/1-72-to-1-35.html","/reference/1-72-to-28mm.html","/reference/1-72-to-32mm.html","/reference/1-72-to-35mm.html","/reference/1-72-to-40mm.html","/reference/1-72-to-75mm.html","/reference/28mm-to-1-35.html","/reference/28mm-to-32mm.html","/reference/28mm-to-35mm.html","/reference/28mm-to-40mm.html","/reference/28mm-to-75mm.html","/reference/32mm-to-1-35.html","/reference/32mm-to-28mm.html","/reference/32mm-to-35mm.html","/reference/32mm-to-40mm.html","/reference/32mm-to-75mm.html","/reference/35mm-to-1-35.html","/reference/35mm-to-28mm.html","/reference/35mm-to-32mm.html","/reference/35mm-to-40mm.html","/reference/35mm-to-75mm.html","/robots.txt","/rss.xml","/sitemap.xml","/stlaccess-social-banner.png","/terms.html","/tools.html","/tools/3d-scale-visualizer.html","/tools/filament-cost-calculator.html","/tools/miniature-scale-identifier.html","/tools/real-world-scale-converter.html","/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator.html","/urls.txt","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2"];
var NAV_MAP = {"/404":"/404.html","/404/":"/404.html","/about":"/about.html","/about/":"/about.html","/contact":"/contact.html","/contact/":"/contact.html","/faq":"/faq.html","/faq/":"/faq.html","/games":"/games.html","/games/":"/games.html","/games/age-of-sigmar":"/games/age-of-sigmar.html","/games/age-of-sigmar/":"/games/age-of-sigmar.html","/games/battletech":"/games/battletech.html","/games/battletech/":"/games/battletech.html","/games/bolt-action":"/games/bolt-action.html","/games/bolt-action/":"/games/bolt-action.html","/games/conquest":"/games/conquest.html","/games/conquest/":"/games/conquest.html","/games/dropzone-commander":"/games/dropzone-commander.html","/games/dropzone-commander/":"/games/dropzone-commander.html","/games/dungeons-and-dragons":"/games/dungeons-and-dragons.html","/games/dungeons-and-dragons/":"/games/dungeons-and-dragons.html","/games/fallout-wasteland-warfare":"/games/fallout-wasteland-warfare.html","/games/fallout-wasteland-warfare/":"/games/fallout-wasteland-warfare.html","/games/flames-of-war":"/games/flames-of-war.html","/games/flames-of-war/":"/games/flames-of-war.html","/games/frostgrave-stargrave":"/games/frostgrave-stargrave.html","/games/frostgrave-stargrave/":"/games/frostgrave-stargrave.html","/games/gaslands":"/games/gaslands.html","/games/gaslands/":"/games/gaslands.html","/games/infinity":"/games/infinity.html","/games/infinity/":"/games/infinity.html","/games/kill-team":"/games/kill-team.html","/games/kill-team/":"/games/kill-team.html","/games/kings-of-war":"/games/kings-of-war.html","/games/kings-of-war/":"/games/kings-of-war.html","/games/legions-imperialis":"/games/legions-imperialis.html","/games/legions-imperialis/":"/games/legions-imperialis.html","/games/malifaux":"/games/malifaux.html","/games/malifaux/":"/games/malifaux.html","/games/marvel-crisis-protocol":"/games/marvel-crisis-protocol.html","/games/marvel-crisis-protocol/":"/games/marvel-crisis-protocol.html","/games/middle-earth-strategy-battle-game":"/games/middle-earth-strategy-battle-game.html","/games/middle-earth-strategy-battle-game/":"/games/middle-earth-strategy-battle-game.html","/games/necromunda":"/games/necromunda.html","/games/necromunda/":"/games/necromunda.html","/games/one-page-rules-grimdark-future":"/games/one-page-rules-grimdark-future.html","/games/one-page-rules-grimdark-future/":"/games/one-page-rules-grimdark-future.html","/games/star-wars-legion":"/games/star-wars-legion.html","/games/star-wars-legion/":"/games/star-wars-legion.html","/games/star-wars-shatterpoint":"/games/star-wars-shatterpoint.html","/games/star-wars-shatterpoint/":"/games/star-wars-shatterpoint.html","/games/star-wars-x-wing":"/games/star-wars-x-wing.html","/games/star-wars-x-wing/":"/games/star-wars-x-wing.html","/games/warcry":"/games/warcry.html","/games/warcry/":"/games/warcry.html","/games/warhammer-40000":"/games/warhammer-40000.html","/games/warhammer-40000/":"/games/warhammer-40000.html","/games/warhammer-the-old-world":"/games/warhammer-the-old-world.html","/games/warhammer-the-old-world/":"/games/warhammer-the-old-world.html","/games/warmachine-hordes":"/games/warmachine-hordes.html","/games/warmachine-hordes/":"/games/warmachine-hordes.html","/guides":"/guides.html","/guides/":"/guides.html","/guides/175cm-baseline":"/guides/175cm-baseline.html","/guides/175cm-baseline/":"/guides/175cm-baseline.html","/guides/28mm-to-32mm-scale-conversion":"/guides/28mm-to-32mm-scale-conversion.html","/guides/28mm-to-32mm-scale-conversion/":"/guides/28mm-to-32mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion":"/guides/32mm-to-28mm-scale-conversion.html","/guides/32mm-to-28mm-scale-conversion/":"/guides/32mm-to-28mm-scale-conversion.html","/guides/arachne-vs-classic-wall-generator-miniatures":"/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/arachne-vs-classic-wall-generator-miniatures/":"/guides/arachne-vs-classic-wall-generator-miniatures.html","/guides/best-budget-3d-printers-wargaming":"/guides/best-budget-3d-printers-wargaming.html","/guides/best-budget-3d-printers-wargaming/":"/guides/best-budget-3d-printers-wargaming.html","/guides/chitubox-lychee-scaling-guide":"/guides/chitubox-lychee-scaling-guide.html","/guides/chitubox-lychee-scaling-guide/":"/guides/chitubox-lychee-scaling-guide.html","/guides/cura-tree-support-settings-miniatures":"/guides/cura-tree-support-settings-miniatures.html","/guides/cura-tree-support-settings-miniatures/":"/guides/cura-tree-support-settings-miniatures.html","/guides/dnd-miniature-scale-guide":"/guides/dnd-miniature-scale-guide.html","/guides/dnd-miniature-scale-guide/":"/guides/dnd-miniature-scale-guide.html","/guides/fdm-miniature-printing-guide":"/guides/fdm-miniature-printing-guide.html","/guides/fdm-miniature-printing-guide/":"/guides/fdm-miniature-printing-guide.html","/guides/fdm-vs-resin-miniatures":"/guides/fdm-vs-resin-miniatures.html","/guides/fdm-vs-resin-miniatures/":"/guides/fdm-vs-resin-miniatures.html","/guides/how-to-measure-miniature-scale":"/guides/how-to-measure-miniature-scale.html","/guides/how-to-measure-miniature-scale/":"/guides/how-to-measure-miniature-scale.html","/guides/real-world-objects-to-28mm":"/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-28mm/":"/guides/real-world-objects-to-28mm.html","/guides/real-world-objects-to-32mm":"/guides/real-world-objects-to-32mm.html","/guides/real-world-objects-to-32mm/":"/guides/real-world-objects-to-32mm.html","/guides/resin2fdm-convert-stl-to-fdm-ready":"/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/resin2fdm-convert-stl-to-fdm-ready/":"/guides/resin2fdm-convert-stl-to-fdm-ready.html","/guides/star-wars-legion-scale-guide":"/guides/star-wars-legion-scale-guide.html","/guides/star-wars-legion-scale-guide/":"/guides/star-wars-legion-scale-guide.html","/guides/upscaling-3d-prints-detail-limit":"/guides/upscaling-3d-prints-detail-limit.html","/guides/upscaling-3d-prints-detail-limit/":"/guides/upscaling-3d-prints-detail-limit.html","/":"/index.html","/legal":"/legal.html","/legal/":"/legal.html","/privacy":"/privacy.html","/privacy/":"/privacy.html","/reference":"/reference.html","/reference/":"/reference.html","/reference/1-100-to-1-35":"/reference/1-100-to-1-35.html","/reference/1-100-to-1-35/":"/reference/1-100-to-1-35.html","/reference/1-100-to-28mm":"/reference/1-100-to-28mm.html","/reference/1-100-to-28mm/":"/reference/1-100-to-28mm.html","/reference/1-100-to-32mm":"/reference/1-100-to-32mm.html","/reference/1-100-to-32mm/":"/reference/1-100-to-32mm.html","/reference/1-100-to-35mm":"/reference/1-100-to-35mm.html","/reference/1-100-to-35mm/":"/reference/1-100-to-35mm.html","/reference/1-100-to-40mm":"/reference/1-100-to-40mm.html","/reference/1-100-to-40mm/":"/reference/1-100-to-40mm.html","/reference/1-100-to-75mm":"/reference/1-100-to-75mm.html","/reference/1-100-to-75mm/":"/reference/1-100-to-75mm.html","/reference/1-35-to-28mm":"/reference/1-35-to-28mm.html","/reference/1-35-to-28mm/":"/reference/1-35-to-28mm.html","/reference/1-35-to-32mm":"/reference/1-35-to-32mm.html","/reference/1-35-to-32mm/":"/reference/1-35-to-32mm.html","/reference/1-35-to-35mm":"/reference/1-35-to-35mm.html","/reference/1-35-to-35mm/":"/reference/1-35-to-35mm.html","/reference/1-35-to-40mm":"/reference/1-35-to-40mm.html","/reference/1-35-to-40mm/":"/reference/1-35-to-40mm.html","/reference/1-35-to-75mm":"/reference/1-35-to-75mm.html","/reference/1-35-to-75mm/":"/reference/1-35-to-75mm.html","/reference/1-48-to-1-35":"/reference/1-48-to-1-35.html","/reference/1-48-to-1-35/":"/reference/1-48-to-1-35.html","/reference/1-48-to-1-56":"/reference/1-48-to-1-56.html","/reference/1-48-to-1-56/":"/reference/1-48-to-1-56.html","/reference/1-48-to-28mm":"/reference/1-48-to-28mm.html","/reference/1-48-to-28mm/":"/reference/1-48-to-28mm.html","/reference/1-48-to-32mm":"/reference/1-48-to-32mm.html","/reference/1-48-to-32mm/":"/reference/1-48-to-32mm.html","/reference/1-48-to-35mm":"/reference/1-48-to-35mm.html","/reference/1-48-to-35mm/":"/reference/1-48-to-35mm.html","/reference/1-48-to-40mm":"/reference/1-48-to-40mm.html","/reference/1-48-to-40mm/":"/reference/1-48-to-40mm.html","/reference/1-48-to-75mm":"/reference/1-48-to-75mm.html","/reference/1-48-to-75mm/":"/reference/1-48-to-75mm.html","/reference/1-56-to-1-35":"/reference/1-56-to-1-35.html","/reference/1-56-to-1-35/":"/reference/1-56-to-1-35.html","/reference/1-56-to-1-48":"/reference/1-56-to-1-48.html","/reference/1-56-to-1-48/":"/reference/1-56-to-1-48.html","/reference/1-56-to-28mm":"/reference/1-56-to-28mm.html","/reference/1-56-to-28mm/":"/reference/1-56-to-28mm.html","/reference/1-56-to-32mm":"/reference/1-56-to-32mm.html","/reference/1-56-to-32mm/":"/reference/1-56-to-32mm.html","/reference/1-56-to-35mm":"/reference/1-56-to-35mm.html","/reference/1-56-to-35mm/":"/reference/1-56-to-35mm.html","/reference/1-56-to-40mm":"/reference/1-56-to-40mm.html","/reference/1-56-to-40mm/":"/reference/1-56-to-40mm.html","/reference/1-56-to-75mm":"/reference/1-56-to-75mm.html","/reference/1-56-to-75mm/":"/reference/1-56-to-75mm.html","/reference/1-72-to-1-35":"/reference/1-72-to-1-35.html","/reference/1-72-to-1-35/":"/reference/1-72-to-1-35.html","/reference/1-72-to-28mm":"/reference/1-72-to-28mm.html","/reference/1-72-to-28mm/":"/reference/1-72-to-28mm.html","/reference/1-72-to-32mm":"/reference/1-72-to-32mm.html","/reference/1-72-to-32mm/":"/reference/1-72-to-32mm.html","/reference/1-72-to-35mm":"/reference/1-72-to-35mm.html","/reference/1-72-to-35mm/":"/reference/1-72-to-35mm.html","/reference/1-72-to-40mm":"/reference/1-72-to-40mm.html","/reference/1-72-to-40mm/":"/reference/1-72-to-40mm.html","/reference/1-72-to-75mm":"/reference/1-72-to-75mm.html","/reference/1-72-to-75mm/":"/reference/1-72-to-75mm.html","/reference/28mm-to-1-35":"/reference/28mm-to-1-35.html","/reference/28mm-to-1-35/":"/reference/28mm-to-1-35.html","/reference/28mm-to-32mm":"/reference/28mm-to-32mm.html","/reference/28mm-to-32mm/":"/reference/28mm-to-32mm.html","/reference/28mm-to-35mm":"/reference/28mm-to-35mm.html","/reference/28mm-to-35mm/":"/reference/28mm-to-35mm.html","/reference/28mm-to-40mm":"/reference/28mm-to-40mm.html","/reference/28mm-to-40mm/":"/reference/28mm-to-40mm.html","/reference/28mm-to-75mm":"/reference/28mm-to-75mm.html","/reference/28mm-to-75mm/":"/reference/28mm-to-75mm.html","/reference/32mm-to-1-35":"/reference/32mm-to-1-35.html","/reference/32mm-to-1-35/":"/reference/32mm-to-1-35.html","/reference/32mm-to-28mm":"/reference/32mm-to-28mm.html","/reference/32mm-to-28mm/":"/reference/32mm-to-28mm.html","/reference/32mm-to-35mm":"/reference/32mm-to-35mm.html","/reference/32mm-to-35mm/":"/reference/32mm-to-35mm.html","/reference/32mm-to-40mm":"/reference/32mm-to-40mm.html","/reference/32mm-to-40mm/":"/reference/32mm-to-40mm.html","/reference/32mm-to-75mm":"/reference/32mm-to-75mm.html","/reference/32mm-to-75mm/":"/reference/32mm-to-75mm.html","/reference/35mm-to-1-35":"/reference/35mm-to-1-35.html","/reference/35mm-to-1-35/":"/reference/35mm-to-1-35.html","/reference/35mm-to-28mm":"/reference/35mm-to-28mm.html","/reference/35mm-to-28mm/":"/reference/35mm-to-28mm.html","/reference/35mm-to-32mm":"/reference/35mm-to-32mm.html","/reference/35mm-to-32mm/":"/reference/35mm-to-32mm.html","/reference/35mm-to-40mm":"/reference/35mm-to-40mm.html","/reference/35mm-to-40mm/":"/reference/35mm-to-40mm.html","/reference/35mm-to-75mm":"/reference/35mm-to-75mm.html","/reference/35mm-to-75mm/":"/reference/35mm-to-75mm.html","/terms":"/terms.html","/terms/":"/terms.html","/tools":"/tools.html","/tools/":"/tools.html","/tools/3d-scale-visualizer":"/tools/3d-scale-visualizer.html","/tools/3d-scale-visualizer/":"/tools/3d-scale-visualizer.html","/tools/filament-cost-calculator":"/tools/filament-cost-calculator.html","/tools/filament-cost-calculator/":"/tools/filament-cost-calculator.html","/tools/miniature-scale-identifier":"/tools/miniature-scale-identifier.html","/tools/miniature-scale-identifier/":"/tools/miniature-scale-identifier.html","/tools/real-world-scale-converter":"/tools/real-world-scale-converter.html","/tools/real-world-scale-converter/":"/tools/real-world-scale-converter.html","/tools/reference-bar-generator":"/tools/reference-bar-generator.html","/tools/reference-bar-generator/":"/tools/reference-bar-generator.html","/tools/slicer-percentage-calculator":"/tools/slicer-percentage-calculator.html","/tools/slicer-percentage-calculator/":"/tools/slicer-percentage-calculator.html"};

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
