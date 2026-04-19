 // Load and display library
        function loadLibrary() {
            const library = JSON.parse(localStorage.getItem('stlaccess_library') || '[]');
            const listDiv = document.getElementById('libraryList');
            const emptyDiv = document.getElementById('emptyState');
            const totalDiv = document.getElementById('totalScales');
            
            totalDiv.textContent = library.length;
            
            if (library.length === 0) {
                listDiv.classList.add('hidden');
                emptyDiv.classList.remove('hidden');
                return;
            }
            
            emptyDiv.classList.add('hidden');
            listDiv.classList.remove('hidden');
            
            listDiv.innerHTML = library.map(item => `
                <div class="bg-slate-900/30 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#ff6b35]/30 transition-colors group">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-[#ff6b35]">
                            <i class="fa-solid fa-ruler-combined"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <span class="font-bold text-lg">${item.source} → ${item.target}</span>
                                <span class="text-[10px] uppercase tracking-widest bg-white/5 px-2 py-1 rounded text-slate-400">${item.logic}</span>
                            </div>
                            <div class="text-sm text-slate-500">Saved on ${item.timestamp}</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4 w-full md:w-auto">
                        <div class="text-3xl font-bold text-[#ff6b35] font-heading">${item.percentage}</div>
                        <div class="flex gap-2 ml-auto">
                            <button onclick="copyPercentage('${item.percentage}')" class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" title="Copy">
                                <i class="fa-regular fa-copy text-slate-400"></i>
                            </button>
                            <button onclick="deleteItem(${item.id})" class="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors" title="Delete">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        function copyPercentage(percent) {
            navigator.clipboard.writeText(percent).then(() => {
                alert('Copied: ' + percent);
            });
        }
        
        function deleteItem(id) {
            let library = JSON.parse(localStorage.getItem('stlaccess_library') || '[]');
            library = library.filter(item => item.id !== id);
            localStorage.setItem('stlaccess_library', JSON.stringify(library));
            loadLibrary();
        }
        
        function clearLibrary() {
            if (confirm('Clear all saved conversions?')) {
                localStorage.removeItem('stlaccess_library');
                loadLibrary();
            }
        }
        
        // Load on page load
        document.addEventListener('DOMContentLoaded', loadLibrary);