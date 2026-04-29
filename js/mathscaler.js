    /**
         * The STLAccess Scale Engine Core
         * Logic: Ratio conversion based on a 1750mm (1.75m) human baseline.
         */
        const SCALES = {
            "1:100": 17.5,
            "1:72": 24.3,
            "1:56": 31.25,
            "1:48": 36.45,
            "1:35": 50.0,
            "28mm": 28.0,
            "32mm": 32.0,
            "35mm": 35.0,
            "40mm": 40.0,
            "75mm": 75.0
        };

        function calculate() {
            const source = document.getElementById('sourceScale').value;
            const target = document.getElementById('targetScale').value;
            const logic = document.querySelector('input[name="logic"]:checked').value;

            // Get base mm values
            let sVal = SCALES[source];
            let tVal = SCALES[target];

            // If user is measuring to "Top of Head", the target height is physically taller
            // Average eye level is approx 91% of total height.
            // If the model is marketed as "32mm", that's usually to eye level.
            // "Top of Head" for that same model would be ~35mm.
            if (logic === 'head') {
                tVal = tVal * 1.09; 
            }

            const result = (tVal / sVal) * 100;
            
            // Visual Update
            const display = document.getElementById('resultDisplay');
            display.textContent = result.toFixed(1) + '%';
        }

        async function copyToClipboard() {
            const result = document.getElementById('resultDisplay').textContent.trim();
            const btn = document.getElementById('copyBtn');
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span');

            try {
                await navigator.clipboard.writeText(result);
                text.textContent = "Copied to Slicer!";
                icon.className = "fa-solid fa-check";
                btn.style.backgroundColor = "#22c55e"; // Success green
            } catch (err) {
                // Fallback for older browsers
                const el = document.createElement('textarea');
                el.value = result;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                text.textContent = "Copied!";
            }

            setTimeout(() => {
                text.textContent = "Copy Percentage";
                icon.className = "fa-regular fa-copy";
                btn.style.backgroundColor = "black";
            }, 2000);
        }

        // Attach listeners
        document.querySelectorAll('select, input').forEach(el => {
            el.addEventListener('change', calculate);
        });

        // URL Parameter Support for Deep Linking
        function checkURLParams() {
            const params = new URLSearchParams(window.location.search);
            const source = params.get('source');
            const target = params.get('target');
            const logic = params.get('logic');

            if (source && SCALES[source]) {
                document.getElementById('sourceScale').value = source;
            }
            if (target && SCALES[target]) {
                const targetSelect = document.getElementById('targetScale');
                // Check if target value exists in options
                if ([...targetSelect.options].some(opt => opt.value === target)) {
                    targetSelect.value = target;
                }
            }
            if (logic === 'eye' || logic === 'head') {
                const radio = document.querySelector(`input[name="logic"][value="${logic}"]`);
                if (radio) radio.checked = true;
            }
            
            calculate();
        }

        // Initial Run
        window.addEventListener('DOMContentLoaded', checkURLParams);