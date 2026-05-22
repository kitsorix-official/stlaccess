// Library Management Functions
        function saveToLibrary() {
            const source = document.getElementById('sourceScale').value;
            const target = document.getElementById('targetScale').value;
            const logic = document.querySelector('input[name="logic"]:checked').value;
            const percentage = document.getElementById('resultDisplay').textContent;
            
            const scaleData = {
                id: Date.now(),
                source,
                target,
                logic,
                percentage,
                timestamp: new Date().toLocaleDateString()
            };
            
            // Get existing library or initialize empty array
            let library = JSON.parse(localStorage.getItem('stlaccess_library') || '[]');
            
            // Add new item to beginning
            library.unshift(scaleData);
            
            // Keep only last 50 items (prevent storage bloat)
            if (library.length > 50) library = library.slice(0, 50);
            
            // Save back to localStorage
            localStorage.setItem('stlaccess_library', JSON.stringify(library));
            
            // Update UI
            updateLibraryCount();
            showLibraryPreview();
            
            // Button feedback
            const btn = document.getElementById('saveBtn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i><span>Saved!</span>';
            btn.classList.add('save-flash');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('save-flash');
            }, 2000);
        }
        
        function updateLibraryCount() {
            const library = JSON.parse(localStorage.getItem('stlaccess_library') || '[]');
            const countBadge = document.getElementById('libCount');
            if (countBadge && library.length > 0) {
                countBadge.textContent = library.length;
                countBadge.classList.remove('hidden');
            }
        }
        
        function showLibraryPreview() {
            const library = JSON.parse(localStorage.getItem('stlaccess_library') || '[]');
            const previewDiv = document.getElementById('libraryPreview');
            const recentDiv = document.getElementById('recentScales');
            
            if (library.length === 0) return;
            
            // Show first 3 items
            const recent = library.slice(0, 3);
            recentDiv.innerHTML = recent.map(item => `
                <div class="flex justify-between items-center bg-black/30 rounded-lg p-3 text-sm">
                    <div class="flex items-center gap-2">
                        <span class="text-slate-400">${item.source} → ${item.target}</span>
                        <span class="text-[10px] text-slate-600 uppercase">${item.logic}</span>
                    </div>
                    <span class="font-bold text-[#ff6b35]">${item.percentage}</span>
                </div>
            `).join('');
            
            previewDiv.classList.remove('hidden');
        }
        
        // Initialize on load
        document.addEventListener('DOMContentLoaded', () => {
            updateLibraryCount();
            showLibraryPreview();
        });