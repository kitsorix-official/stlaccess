(function () {

  // ============================================
  // Privacy-first Website Observability
  // Configuration
  // ============================================


  // Google Apps Script Web App endpoint
  // Change this when deploying a new collector  
  const CONFIG = {
    endpoint: 'https://script.google.com/macros/s/AKfycbxlcuMoxmCkBBcCrd0CVhJDvQzqjPv8LK_RuvXjAJEBnx44vK-igF3KUwFpwILEk0EwOw/exec',

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
  // Admin opt-out
  // ============================================

  if (window.location.search.includes(CONFIG.adminParameter + '=1')) {

    localStorage.setItem(
      'observability_admin',
      '1'
    );

    console.log('[Observability] Admin disabled');

  }


  if (localStorage.getItem('observability_admin') === '1') {
    return;
  }


  // ============================================
  // Session ID
  // ============================================

  let sessionId = sessionStorage.getItem('session_id');

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(
      'session_id',
      sessionId
    );
  }


  // ============================================
  // Client ID
  // Anonieme browser instance
  // ============================================

  let clientId = localStorage.getItem('client_id');

  if (!clientId) {

    clientId = crypto.randomUUID();

    localStorage.setItem(
      'client_id',
      clientId
    );
  }


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


    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';

    return 'Other';
  }


  // ============================================
  // Event payload
  // ============================================

  const payload = {

    timestamp_utc: new Date().toISOString(),

    page:
      window.location.pathname,

    event:
      'page_view',

    event_value:
      '',

    referrer:
      document.referrer || 'direct',

    device:
      getDevice(),

    viewport:
      getViewport(),

    browser:
      getBrowser(),

    client_id:
      clientId,

    session_id:
      sessionId
  };


  // ============================================
  // Send
  // ============================================

  window.addEventListener(
    'load',
    function () {

      fetch(
        CONFIG.endpoint,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body:
            JSON.stringify(payload)
        }
      )
        .catch(function (error) {

          console.log(
            '[Observability] Error:',
            error
          );

        });

    }
  );


})();