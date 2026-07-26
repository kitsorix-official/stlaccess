(function() {
   // ============================================
  // Domein-lock: site werkt alleen op stlaccess.com
  // ============================================
  
  const ALLOWED_DOMAINS = ['stlaccess.com', 'www.stlaccess.com'];
  const currentHost = window.location.hostname;
  
  if (!ALLOWED_DOMAINS.includes(currentHost)) {
    // Wis de hele pagina inhoud
    document.documentElement.innerHTML = '';
    document.body.innerHTML = '';
    
    // Optioneel: toon een melding (maar meestal is leeg beter)
    console.warn('This content is only available on stlaccess.com');
    
    // Stop alle verdere scripts
    throw new Error('Domain not authorized');
  }

  
  // ============================================
  // Privacy-first Analytics
  // ============================================

  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz-HoWX1HqmrBJ2uNUT1K3MnIJj-mMqh-gs5zaV_qHrwEbJwSYxRLxuVMgViT3rzYKL9g/exec'; // <-- Jouw URL hier

  // 1. ADMIN OPT-OUT
  // Bezoek eenmalig: https://stlaccess.com/?admin=1
  // Daarna word je nooit meer getrackt in deze browser.
  if (window.location.search.includes('admin=1')) {
    localStorage.setItem('analytics_admin', '1');
    console.log('[Analytics] Admin opt-out ingesteld voor deze browser.');
  }

  if (localStorage.getItem('analytics_admin') === '1') {
    console.log('[Analytics] Admin mode — tracking uitgeschakeld.');
    return; // Stop hier, stuur niets naar Google Sheets
  }

  // 2. Alleen tracken op productie domein (stlaccess.com)
  const hostname = window.location.hostname;
  const isProduction = hostname === 'stlaccess.com' || hostname === 'www.stlaccess.com';
  
  if (!isProduction) {
    console.log('[Analytics] Local/dev omgeving — tracking uitgeschakeld.');
    return;
  }

  // 3. Visitor type (sessionStorage = privacy-friendly, geen cookies)
  let visitorType = 'return';
  if (!sessionStorage.getItem('analytics_session')) {
    sessionStorage.setItem('analytics_session', '1');
    visitorType = 'new';
  }

  // 4. Device detectie — combinatie van viewport + user agent + touch
  const width = window.innerWidth;
  const height = window.innerHeight;
  const minDimension = Math.min(width, height);
  const ua = navigator.userAgent.toLowerCase();

  const isMobileUA = /iphone|ipod|android.*mobile|windows phone/i.test(ua);
  const isTabletUA = /ipad|android(?!.*mobile)|tablet|kindle|silk/i.test(ua);
  const isTouch = navigator.maxTouchPoints > 1;

  let device = 'desktop';

  if (isMobileUA || (isTouch && minDimension <= 480)) {
    device = 'mobile';
  } else if (isTabletUA || (isTouch && minDimension <= 1024)) {
    device = 'tablet';
  } else if (minDimension <= 480) {
    device = 'mobile';
  } else if (minDimension <= 1024) {
    device = 'tablet';
  }

  // 5. Data object
  const payload = {
    url: window.location.href,
    referrer: document.referrer || 'direct',
    device: device,
    visitorType: visitorType
  };

  // 6. Verstuur naar Apps Script pas als pagina volledig geladen is
  window.addEventListener('load', function() {
    fetch(WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(err) {
      console.log('Analytics error:', err);
    });
  });
})();