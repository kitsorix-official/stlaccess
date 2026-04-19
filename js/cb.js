  // Enhanced Cookie Logic
        window.addEventListener('load', () => {
            const consent = localStorage.getItem('cookie-consent');
            if (!consent) {
                setTimeout(() => {
                    const banner = document.getElementById('cookie-banner');
                    banner.classList.add('show');
                    // Accessibility: ensure it can be announced
                    banner.setAttribute('aria-hidden', 'false');
                }, 1000);
            }
        });

        function acceptAllCookies() {
            localStorage.setItem('cookie-consent', 'accepted');
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_ads_personalization': 'granted',
                'analytics_storage': 'granted'
            });
            hideBanner();
        }

        function rejectAllCookies() {
            localStorage.setItem('cookie-consent', 'rejected');
            hideBanner();
        }

        function hideBanner() {
            const banner = document.getElementById('cookie-banner');
            banner.classList.remove('show');
            banner.setAttribute('aria-hidden', 'true');
            // Give focus back to main content if user was tabbing
            document.getElementById('main-content').focus();
        }

        function showCookieSettings() {
             const banner = document.getElementById('cookie-banner');
             banner.classList.add('show');
             banner.setAttribute('aria-hidden', 'false');
        }