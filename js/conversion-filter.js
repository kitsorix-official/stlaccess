     /**
         * Live Library Search Functionality
         */
        function filterTable() {
            const input = document.getElementById('librarySearch');
            const filter = input.value.toLowerCase();
            const rows = document.querySelectorAll('.searchable-row');
            const groups = document.querySelectorAll('.conversion-group');
            const noResults = document.getElementById('noResults');
            
            let totalVisibleRows = 0;

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(filter)) {
                    row.classList.remove('search-hidden');
                    totalVisibleRows++;
                } else {
                    row.classList.add('search-hidden');
                }
            });

            // Hide the entire group (table + header) if no rows match within it
            groups.forEach(group => {
                const visibleRowsInGroup = group.querySelectorAll('.searchable-row:not(.search-hidden)').length;
                if (visibleRowsInGroup === 0) {
                    group.classList.add('hidden');
                } else {
                    group.classList.remove('hidden');
                }
            });

            // Show 'No Results' message if everything is filtered out
            if (totalVisibleRows === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }

        /**
         * Helper to copy the specific percentage from the row
         */
        async function copyRow(btn) {
            const row = btn.closest('tr');
            const percent = row.querySelector('.font-mono').innerText;
            const originalText = btn.innerText;

            try {
                await navigator.clipboard.writeText(percent);
                btn.innerText = "COPIED!";
                btn.classList.add('text-white');
            } catch (err) {
                // Fallback
                const el = document.createElement('textarea');
                el.value = percent;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                btn.innerText = "COPIED!";
            }

            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('text-white');
            }, 1500);
        }