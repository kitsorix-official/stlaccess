/**
 * conversion-filter.js — Client-side search for conversion cards
 */
(function() {
  const input = document.getElementById('conversion-search');
  const list = document.getElementById('conversions-list');
  if (!input || !list) return;

  input.addEventListener('input', function() {
    const q = this.value.toLowerCase();
    list.querySelectorAll('.conversion-card').forEach(function(card) {
      const text = (card.getAttribute('data-search') || '').toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
})();
