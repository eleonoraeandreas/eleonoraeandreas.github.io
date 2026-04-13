'use strict';

/* ================================================================
   main.js — Wedding landing page enhancements
   Pure vanilla JS. No dependencies. Progressive enhancement only:
   the page is fully functional without this script.
   ================================================================ */


// ────────────────────────────────────────────────────────────────
// PARALLAX — subtle photo shift on hero mousemove
// Only on desktop (pointer: fine) and when motion is allowed
// ────────────────────────────────────────────────────────────────
function initParallax() {
  const photoImg = document.querySelector('.hero__photo img');
  const heroSect = document.querySelector('.section--hero');

  if (!photoImg || !heroSect) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let raf;
  let currentX = 0;
  let currentY = 0;
  let targetX  = 0;
  let targetY  = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  function animate() {
    currentX = lerp(currentX, targetX, 0.07);
    currentY = lerp(currentY, targetY, 0.07);
    photoImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.06)`;

    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      raf = requestAnimationFrame(animate);
    }
  }

  heroSect.addEventListener('mousemove', (e) => {
    const rect = heroSect.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;

    targetX = nx * 10;
    targetY = ny * 6;

    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(animate);
  });

  heroSect.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(animate);
  });
}


// ────────────────────────────────────────────────────────────────
// IBAN COPY — click the IBAN block to copy to clipboard
// Falls back to native text selection if Clipboard API unavailable
// ────────────────────────────────────────────────────────────────
function initIbanCopy() {
  const block   = document.getElementById('ibanBlock');
  const valueEl = document.getElementById('ibanValue');
  const hintEl  = block ? block.querySelector('.iban-hint') : null;

  if (!block || !valueEl || !hintEl) return;

  const originalHint = hintEl.textContent;

  block.addEventListener('click', async () => {
    const text = valueEl.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      showFeedback('copiato ✓', 'rgba(139, 115, 85, 0.18)');
    } catch {
      const range = document.createRange();
      range.selectNode(valueEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      showFeedback('selezionato', '');
    }
  });

  function showFeedback(message, bgColor) {
    hintEl.textContent = message;
    if (bgColor) block.style.background = bgColor;

    clearTimeout(block._copyTimer);
    block._copyTimer = setTimeout(() => {
      hintEl.textContent     = originalHint;
      block.style.background = '';
    }, 2200);
  }
}


// ────────────────────────────────────────────────────────────────
// COUNTDOWN — "tra X giorni" appended to the date line
// ────────────────────────────────────────────────────────────────
function initCountdown() {
  const dateLine = document.querySelector('.hero__dateline');
  if (!dateLine) return;

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const WEDDING_DAY = startOfDay(new Date(2026, 8, 12));  // 12 Sep 2026
  const today       = startOfDay(new Date());

  const days = Math.round((WEDDING_DAY - today) / 86400000);

  let label;
  if (days < 0)      return;                                // past — show nothing
  else if (days === 0) label = 'oggi è il giorno!';
  else if (days === 1) label = '1 giorno';
  else                 label = `${days.toLocaleString('it-IT')} giorni`;

  const span = document.createElement('span');
  span.className = 'hero__countdown';
  span.textContent = ` · ${label}`;
  dateLine.appendChild(span);
}


// ────────────────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initIbanCopy();
  initCountdown();
});
