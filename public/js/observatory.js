(function () {

  // ============================================
  // Privacy-first Website Observability (v3)
  //
  // Stores NOTHING on the visitor's device. No
  // cookies, no localStorage, no sessionStorage,
  // no persistent or session identifiers.
  //
  // That means no ePrivacy consent is required, so
  // the site needs no consent banner. Measurement
  // rests on legitimate interest for first-party,
  // aggregate audience stats (privacy notice only).
  //
  // The one exception is the opt-out flag set by
  // ?admin=1: it records the visitor's own request
  // to be excluded, and nothing else.
  // ============================================

  // Google Apps Script Web App endpoint
  // Change this when deploying a new collector
  const CONFIG = {
    endpoint: 'https://script.google.com/macros/s/AKfycbxaJVMq6fCIS5-gdNHJoX3QVUmKl0BzoNx1nNlfuOpexActx5sdCodKcVcaF_WLiJdR/exec',

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
  // Opt-out
  //
  // The only thing this script ever stores, and it
  // stores only the visitor's own decision to be
  // excluded — the same as honouring "do not track".
  // Safe against storage throwing (Safari "Block All
  // Cookies", WebViews, enterprise policies).
  // ============================================

  function safeStore(kind) {

    try {

      const store = window[kind];
      const probe = '__obs_probe__';

      store.setItem(probe, '1');
      store.removeItem(probe);

      return store;

    } catch (error) {
      return null;
    }
  }

  function storeGet(store, key) {

    try {
      return store ? store.getItem(key) : null;

    } catch (error) {
      return null;
    }
  }

  function storeSet(store, key, value) {

    try {
      if (store) store.setItem(key, value);

    } catch (error) {
      // Storage full or blocked — measurement already ran, nothing to do
    }
  }

  const optOutStore = safeStore('localStorage');

  const params = new URLSearchParams(window.location.search);

  if (params.get(CONFIG.adminParameter) === '1') {
    storeSet(optOutStore, 'observability_admin', '1');
    console.log('[Observability] Opted out');
  }

  if (storeGet(optOutStore, 'observability_admin') === '1') {
    return;
  }


  // ============================================
  // Platform / pointer / automation signals
  // ============================================

  function getPlatform() {

    try {
      if (navigator.userAgentData && navigator.userAgentData.platform) {
        return navigator.userAgentData.platform;
      }

    } catch (error) {
      // userAgentData unavailable
    }

    return navigator.platform || '';
  }

  function isCoarsePointer() {

    try {
      return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    } catch (error) {
      return false;
    }
  }

  function isWebdriver() {
    return navigator.webdriver === true;
  }

  // Named crawlers, preview fetchers, uptime monitors and headless drivers.
  // Deliberately an explicit list — a bare /bot/ would match some phone
  // brands (e.g. "CUBOT") that are real people.
  const CRAWLER_PATTERN = /bingbot|googlebot|google web preview|yandex|baiduspider|duckduckbot|applebot|ahrefs|semrush|mj12bot|dotbot|petalbot|bytespider|gptbot|oai-searchbot|chatgpt-user|claudebot|anthropic|ccbot|perplexity|cohere|seznambot|sogou|exabot|crawler|spider|slurp|scrapy|internetmeasurement|headless|lighthouse|pingdom|uptimerobot|statuscake|prerender|facebookexternalhit|embedly|linkedinbot|twitterbot|discordbot|slackbot|telegrambot|whatsapp|skypeuripreview|monitoring/;

  // human | crawler | automation — lets the sheet keep automated
  // traffic out of the human numbers.
  function getAgent() {

    const ua = navigator.userAgent.toLowerCase();

    if (isWebdriver() || /headless|phantomjs|selenium|puppeteer|playwright/.test(ua)) {
      return 'automation';
    }

    if (CRAWLER_PATTERN.test(ua)) {
      return 'crawler';
    }

    return 'human';
  }


  // ============================================
  // Device detection
  // ============================================

  function getDevice() {

    const width = window.innerWidth;
    const ua = navigator.userAgent.toLowerCase();
    const platform = getPlatform().toLowerCase();
    const coarse = isCoarsePointer();
    const touch = (navigator.maxTouchPoints || 0) > 1;

    // iPadOS 13+ sends a desktop Mac user-agent; touch points give it away.
    if (platform.indexOf('mac') === 0 && touch) {
      return 'tablet';
    }

    if (/iphone|ipod/.test(ua)) return 'mobile';
    if (/android/.test(ua)) return /mobile/.test(ua) ? 'mobile' : 'tablet';
    if (/ipad|tablet/.test(ua)) return 'tablet';

    // Chromium client hints are the reliable signal where available.
    try {
      if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
        if (navigator.userAgentData.mobile) return 'mobile';
        if (coarse && width <= 1366) return 'tablet';
        return 'desktop';
      }

    } catch (error) {
      // fall through to pointer heuristics
    }

    // Coarse *primary* pointer, not maxTouchPoints: a Windows touch laptop
    // still has a fine primary pointer and must stay a desktop.
    if (coarse && width <= 640) return 'mobile';
    if (coarse && width <= 1366) return 'tablet';

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

    if (/iphone|ipod/.test(ua)) return 'iOS';
    if (/ipad/.test(ua)) return 'iOS';
    if (/android/.test(ua)) return 'Android';
    if (/windows|win32|win64/.test(ua)) return 'Windows';
    if (/mac os x|macintosh/.test(ua)) return 'macOS';
    if (/cros/.test(ua)) return 'ChromeOS';
    if (/linux/.test(ua)) return 'Linux';

    // User-agent without an OS token (some crawlers, reduced UAs).
    // Fall back to the platform hint instead of returning 'Other'.
    const platform = getPlatform().toLowerCase();

    if (platform.indexOf('mac') === 0 && (navigator.maxTouchPoints || 0) > 1) return 'iOS';
    if (platform.indexOf('win') === 0) return 'Windows';
    if (platform.indexOf('mac') === 0) return 'macOS';
    if (platform.indexOf('android') === 0) return 'Android';
    if (platform.indexOf('ios') === 0) return 'iOS';
    if (platform.indexOf('chrome os') === 0 || platform.indexOf('cros') === 0) return 'ChromeOS';
    if (platform.indexOf('linux') === 0) return 'Linux';

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
  // AI assistant / AI search source
  // Parsed from the referrer host. Sent as
  // `ai_source` (the collector's column name).
  //
  // Caveat: some AI tools send no referrer at all,
  // so AI traffic will always be undercounted —
  // treat this as a floor, not a total.
  // ============================================

  const AI_HOSTS = [
    [/(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$|(^|\.)openai\.com$/, 'chatgpt'],
    [/(^|\.)perplexity\.ai$/, 'perplexity'],
    [/^(gemini|bard)\.google\./, 'gemini'],
    [/(^|\.)copilot\.microsoft\.com$/, 'copilot'],
    [/(^|\.)grok\.com$|(^|\.)x\.ai$/, 'grok'],
    [/(^|\.)claude\.ai$/, 'claude'],
    [/(^|\.)deepseek\.com$/, 'deepseek'],
    [/(^|\.)mistral\.ai$/, 'mistral'],
    [/(^|\.)you\.com$/, 'you'],
    [/(^|\.)phind\.com$/, 'phind'],
    [/(^|\.)poe\.com$/, 'poe'],
    [/(^|\.)meta\.ai$/, 'meta'],
    [/(^|\.)pi\.ai$/, 'pi'],
    [/(^|\.)lmarena\.ai$/, 'lmarena'],
    [/(^|\.)t3\.chat$/, 't3chat'],
    [/(^|\.)openrouter\.ai$/, 'openrouter'],
    [/(^|\.)huggingface\.co$/, 'huggingface'],
    [/(^|\.)duck\.ai$/, 'duckduckgo'],
    [/(^|\.)qwen\.ai$|(^|\.)chat\.qwen\.ai$|(^|\.)tongyi\.aliyun\.com$/, 'qwen'],
    [/(^|\.)kimi\.com$|(^|\.)kimi\.moonshot\.cn$|(^|\.)moonshot\.cn$/, 'kimi'],
    [/(^|\.)doubao\.com$/, 'doubao'],
    [/(^|\.)genspark\.ai$/, 'genspark'],
    [/(^|\.)character\.ai$/, 'character'],
    [/(^|\.)elicit\.com$/, 'elicit'],
    [/(^|\.)consensus\.app$/, 'consensus']
  ];

  function getAiSource() {

    const ref = document.referrer;

    if (!ref) return '';

    try {

      const url = new URL(ref);
      const host = url.hostname.toLowerCase().replace(/^www\./, '');

      // Bing's Copilot lives on the search host, so require the /chat path.
      if (host === 'bing.com') {
        return url.pathname.indexOf('/chat') === 0 ? 'copilot' : '';
      }

      for (let i = 0; i < AI_HOSTS.length; i++) {
        if (AI_HOSTS[i][0].test(host)) {
          return AI_HOSTS[i][1];
        }
      }

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

      ai_source:
        getAiSource(),

      device:
        getDevice(),

      viewport:
        getViewport(),

      browser:
        getBrowser(),

      os:
        getOs(),

      agent:
        getAgent(),

      scroll_depth:
        '',

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


})();
