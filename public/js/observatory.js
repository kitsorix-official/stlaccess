(function () {

  // ============================================
  // Privacy-first Website Observability (v2)
  // Configuration
  // ============================================

  // Google Apps Script Web App endpoint
  // Change this when deploying a new collector
  const CONFIG = {
    endpoint: 'https://script.google.com/macros/s/AKfycbwTAVgPQUjJ83Q_RWJHBygXpgREuIY53eRdRQtSvXREMxZuZ2bGDBL-QQ1K72Ep_Fn3pQ/exec',

    // Must match the SITE_KEY in the Apps Script collector
    siteKey: 'obs_stlaccess_2026_9vXk2Q7mP4wZc8Lt',

    allowedDomains: [
      'stlaccess.com',
      'www.stlaccess.com'
    ],

    adminParameter: 'admin'
  };


  // ============================================
  // Domain protection
  // ============================================

  const hostname = window.location.hostname;

  if (!CONFIG.allowedDomains.includes(hostname)) {
    console.log('[Observability] Domain not allowed');
    return;
  }


  // ============================================
  // Admin opt-out (?admin=1)
  // ============================================

  const params = new URLSearchParams(window.location.search);

  if (params.get(CONFIG.adminParameter) === '1') {
    localStorage.setItem('observability_admin', '1');
    console.log('[Observability] Admin disabled');
  }

  if (localStorage.getItem('observability_admin') === '1') {
    return;
  }


  // ============================================
  // UUID helper
  // ============================================

  function makeUuid() {

    if (window.crypto && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }


  // ============================================
  // Session ID
  // Temporary, per-tab session only
  // ============================================

  let sessionId = sessionStorage.getItem('session_id');

  if (!sessionId) {
    sessionId = makeUuid();
    sessionStorage.setItem('session_id', sessionId);
  }

  const isSessionStart = sessionStorage.getItem('session_started') !== '1';

  if (isSessionStart) {
    sessionStorage.setItem('session_started', '1');
  }


  // ============================================
  // New vs returning visitor
  // The persistent ID stays in localStorage and is
  // NEVER transmitted. Only the boolean label leaves
  // this browser.
  // ============================================

  const isNewVisitor = !localStorage.getItem('client_id');

  if (isNewVisitor) {
    localStorage.setItem('client_id', makeUuid());
  }

  const visitorType = isNewVisitor ? 'new' : 'returning';


  // ============================================
  // Device detection
  // ============================================

  function getDevice() {

    const width = window.innerWidth;
    const touch = navigator.maxTouchPoints > 1;

    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipod|android.*mobile/.test(ua)) {
      return 'mobile';
    }

    if (
      /ipad|tablet/.test(ua) ||
      (touch && width <= 1024)
    ) {
      return 'tablet';
    }

    if (width <= 480) {
      return 'mobile';
    }

    if (width <= 1024) {
      return 'tablet';
    }

    return 'desktop';
  }


  // ============================================
  // Viewport category
  // ============================================

  function getViewport() {

    const width = window.innerWidth;

    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';

    return '2xl';
  }


  // ============================================
  // Browser family only
  // ============================================

  function getBrowser() {

    const ua = navigator.userAgent;

    if (/Edg\//.test(ua)) return 'Edge';
    if (/OPR|Opera/.test(ua)) return 'Opera';
    if (/SamsungBrowser/.test(ua)) return 'Samsung';
    if (/Firefox|FxiOS/.test(ua)) return 'Firefox';
    if (/CriOS/.test(ua)) return 'Chrome';
    if (/Chrome/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua)) return 'Safari';

    return 'Other';
  }


  // ============================================
  // Operating system (coarse)
  // ============================================

  function getOs() {

    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) return 'iOS';
    if (/android/.test(ua)) return 'Android';
    if (/windows|win/.test(ua)) return 'Windows';
    if (/mac os x|macintosh/.test(ua)) return 'macOS';
    if (/linux|crOS/.test(ua)) return 'Linux';

    return 'Other';
  }


  // ============================================
  // Traffic source
  // ============================================

  function getTrafficSource() {

    const ref = document.referrer;

    if (!ref) return 'direct';

    try {

      const host = new URL(ref).hostname.toLowerCase();

      if (/google\.|bing\.|duckduckgo\.|yahoo\.|startpage\.|ecosia\.|qwant\.|brave\.|search\./.test(host)) {
        return 'search';
      }

      if (/(^|\.)(facebook\.|twitter\.|x\.|reddit\.|instagram\.|linkedin\.|youtube\.|discord\.|pinterest\.|t\.co|m\.me|whatsapp\.)/.test(host)) {
        return 'social';
      }

      return 'referral';

    } catch (error) {
      return 'referral';
    }
  }


  // ============================================
  // Search engine, parsed from referrer host
  // ============================================

  function getEngine() {

    const ref = document.referrer;

    if (!ref) return '';

    try {

      const host = new URL(ref).hostname.toLowerCase();

      if (/google\./.test(host)) return 'google';
      if (/bing\./.test(host)) return 'bing';
      if (/duckduckgo\./.test(host)) return 'duckduckgo';
      if (/brave\./.test(host)) return 'brave';
      if (/yahoo\./.test(host)) return 'yahoo';
      if (/ecosia\./.test(host)) return 'ecosia';
      if (/qwant\./.test(host)) return 'qwant';
      if (/startpage\./.test(host)) return 'startpage';
      if (/search\./.test(host)) return 'other';

      return '';

    } catch (error) {
      return '';
    }
  }


  // ============================================
  // Referrer, stripped of query strings & hash
  // ============================================

  function getReferrer() {

    const ref = document.referrer;

    if (!ref) return 'direct';

    try {

      const u = new URL(ref);

      return u.hostname + u.pathname;

    } catch (error) {
      return ref.split('?')[0].split('#')[0];
    }
  }


  // ============================================
  // Event payload
  // ============================================

  function send(eventName, eventValue, extra) {

    const payload = {

      timestamp_utc:
        new Date().toISOString(),

      page:
        window.location.pathname,

      event:
        eventName,

      event_value:
        eventValue || '',

      referrer:
        getReferrer(),

      traffic_source:
        getTrafficSource(),

      engine:
        getEngine(),

      device:
        getDevice(),

      viewport:
        getViewport(),

      browser:
        getBrowser(),

      os:
        getOs(),

      language:
        navigator.language || '',

      visitor_type:
        visitorType,

      scroll_depth:
        '',

      session_id:
        sessionId,

      site_key:
        CONFIG.siteKey
    };

    if (extra) {
      for (const key in extra) {
        if (extra.hasOwnProperty(key)) {
          payload[key] = extra[key];
        }
      }
    }

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {

      navigator.sendBeacon(
        CONFIG.endpoint,
        body
      );

    } else {

      fetch(
        CONFIG.endpoint,
        {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          body: body
        }
      )
        .catch(function () {});

    }
  }


  // ============================================
  // Scroll depth (throttled, sent once on leave)
  // ============================================

  let maxScrollDepth = 0;
  let scrollScheduled = false;
  let scrollSent = false;

  function readScrollDepth() {

    scrollScheduled = false;

    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;

    if (total <= 0) return;

    const depth = Math.round((window.scrollY / total) * 100);

    if (depth > maxScrollDepth) {
      maxScrollDepth = depth;
    }
  }

  document.addEventListener(
    'scroll',
    function () {
      if (scrollScheduled) return;
      scrollScheduled = true;
      setTimeout(readScrollDepth, 500);
    },
    { passive: true }
  );

  function sendScrollDepth() {

    if (scrollSent) return;
    scrollSent = true;

    if (maxScrollDepth > 0) {
      send('page_scroll', '', {
        scroll_depth: String(maxScrollDepth)
      });
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      sendScrollDepth();
    }
  });

  window.addEventListener('pagehide', sendScrollDepth);


  // ============================================
  // Send page_view (immediately, script is defer)
  // ============================================

  send('page_view');

  if (isSessionStart) {
    send('session_start');
  }


})();
