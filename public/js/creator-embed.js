   function updateBadge() {
            const labelInput = document.getElementById('badgeLabel').value || "STLAccess Verified";
            const theme = document.getElementById('badgeTheme').value;
            const icon = document.getElementById('badgeIcon').value;
            
            const badge = document.getElementById('previewBadge');
            const iconContainer = document.getElementById('iconContainer');
            const iconClass = document.getElementById('badgeIconClass');
            const labelText = document.getElementById('badgeLabelText');
            const embedArea = document.getElementById('embedCode');

            // 1. Update Text
            labelText.innerText = labelInput;

            // 2. Update Icon
            const iconMap = {
                'check': 'fa-circle-check',
                'shield': 'fa-shield-halved',
                'cube': 'fa-cube'
            };
            iconClass.className = `fa-solid ${iconMap[icon]}`;

            // 3. Update Theme
            if (theme === 'dark') {
                badge.className = "flex items-center gap-4 px-8 py-5 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl transition-all duration-500 cursor-default";
                iconContainer.className = "w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-[#ff6b35]";
            } else if (theme === 'brand') {
                badge.className = "flex items-center gap-4 px-8 py-5 rounded-2xl border border-[#ff6b35]/20 bg-[#ff6b35] shadow-xl shadow-[#ff6b35]/20 transition-all duration-500 cursor-default";
                iconContainer.className = "w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white";
                labelText.className = "font-bold text-sm font-heading tracking-tight text-black";
                // Reset subtitle color for visibility on orange
                badge.querySelector('span:last-child').className = "text-[9px] uppercase font-black tracking-widest text-black/50";
            } else if (theme === 'glass') {
                badge.className = "flex items-center gap-4 px-8 py-5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 cursor-default";
                iconContainer.className = "w-8 h-8 flex items-center justify-center rounded-lg bg-[#ff6b35] text-black";
                labelText.className = "font-bold text-sm font-heading tracking-tight text-white";
                badge.querySelector('span:last-child').className = "text-[9px] uppercase font-black tracking-widest text-slate-500";
            }

            if (theme !== 'brand') {
                labelText.className = "font-bold text-sm font-heading tracking-tight text-white";
                badge.querySelector('span:last-child').className = "text-[9px] uppercase font-black tracking-widest text-slate-500";
            }

            // 4. Update Embed Code
            const currentBadgeHtml = badge.outerHTML.replace('previewBadge', '').replace('transition-all duration-500', '');
            embedArea.value = `<!-- STLAccess Trust Badge -->\n<a href="https://stlaccess.com/conversion" style="text-decoration:none; display:inline-block;" target="_blank">\n${currentBadgeHtml}\n</a>`;
        }

        async function copyEmbed() {
            const code = document.getElementById('embedCode').value;
            const btn = document.getElementById('copyBtn');
            const originalText = btn.innerText;

            try {
                await navigator.clipboard.writeText(code);
                btn.innerText = "COPIED!";
                btn.classList.add('bg-[#ff6b35]', 'text-black');
            } catch (err) {
                // Manual fallback
                const el = document.createElement('textarea');
                el.value = code;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                btn.innerText = "COPIED!";
            }

            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-[#ff6b35]', 'text-black');
            }, 2000);
        }

        // Initialize on load
        window.onload = updateBadge;