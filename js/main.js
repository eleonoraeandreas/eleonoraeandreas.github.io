'use strict';

/* ================================================================
   main.js — Wedding landing page enhancements
   Pure vanilla JS. No dependencies. Progressive enhancement only:
   the page is fully functional (in Italian) without this script.
   ================================================================ */


// ────────────────────────────────────────────────────────────────
// I18N — Italian / German dictionary
// Italian is also hard-coded in index.html as the no-JS fallback;
// German lives only here. Keys map to [data-i18n*] attributes.
//   data-i18n            → textContent
//   data-i18n-html       → innerHTML (only where a <br> is needed)
//   data-i18n-aria-label → aria-label attribute
//   data-i18n-title      → title attribute
//   data-i18n-alt        → alt attribute
// ────────────────────────────────────────────────────────────────
const I18N = {
  it: {
    'hero.aria':            'Benvenuto',
    'hero.eyebrow':         'Ci sposiamo!!',
    'hero.dateline':        'Sabato 12 Settembre 2026',
    'hero.photoAlt':        'Foto di Eleonora e Andreas',
    'hero.verse':           "Non vediamo l'ora di festeggiare questo giorno speciale insieme a voi!",
    'hero.place':           'Con tutto il nostro affetto,<br>Ele e Andre',

    'location.aria':          'Luogo e data',
    'location.title':         'Dove & Quando',
    'location.ceremony':      'Cerimonia',
    'location.ceremonyTime':  'ore 16:30',
    'location.reception':     'Ricevimento',
    'location.receptionTime': 'A seguire',
    'location.mapTitle':      'Mappa: Strada Val S. Martino Sup., 60, Torino',
    'location.mapLinkAria':   'Apri il percorso in Google Maps (si apre in nuova scheda)',
    'location.mapLink':       'Apri in Google Maps →',
    'location.parkingLabel':  'Parcheggio',
    'location.parkingText':   'Maggiori dettagli per il parcheggio e possibile servizio navetta saranno comunicati più avanti sul sito.',

    'rsvp.aria':       'Conferma presenza',
    'rsvp.message':    'Vi preghiamo di confermare la vostra presenza entro martedì 30 giugno',
    'rsvp.btn':        'Conferma la tua presenza',
    'rsvp.btnAria':    'Conferma la tua presenza — si apre Google Forms in nuova scheda',
    'rsvp.presence':   'La vostra presenza è ciò che più conta per rendere questa giornata memorabile!',
    'rsvp.giftText':   'Se alcuni di voi desiderassero farci un regalo, potete contribuire al nostro sogno di comprare una casa nel verde delle nostre colline.',
    'rsvp.ibanAria':   "Codice IBAN — clicca per copiare l'IBAN",
    'rsvp.ibanHolder': 'Intestatario',
    'rsvp.ibanBank':   'Banca',
    'rsvp.ibanHint':   "clicca per copiare l'IBAN",
    'rsvp.ibanCopied':   'copiato ✓',
    'rsvp.ibanSelected': 'selezionato',

    'gift.aria': 'Regalo',

    'cd.today': "è il giorno!",
    'cd.one':   ' manca 1 giorno!',
    'cd.many':  ' mancano {n} giorni!',
  },

  de: {
    'hero.aria':            'Willkommen',
    'hero.eyebrow':         'Wir heiraten!!',
    'hero.dateline':        'Samstag, 12. September 2026',
    'hero.photoAlt':        'Foto von Eleonora und Andreas',
    'hero.verse':           'Wir können es kaum erwarten, diesen besonderen Tag gemeinsam mit euch zu feiern!',
    'hero.place':           'Mit all unserer Liebe,<br>Ele und Andre',

    'location.aria':          'Ort und Datum',
    'location.title':         'Wo & Wann',
    'location.ceremony':      'Trauung',
    'location.ceremonyTime':  '16:30 Uhr',
    'location.reception':     'Empfang',
    'location.receptionTime': 'Im Anschluss',
    'location.mapTitle':      'Karte: Strada Val S. Martino Sup., 60, Turin',
    'location.mapLinkAria':   'Route in Google Maps öffnen (öffnet in neuem Tab)',
    'location.mapLink':       'In Google Maps öffnen →',
    'location.parkingLabel':  'Parkplatz',
    'location.parkingText':   'Weitere Informationen zu Parkplatz und möglichem Shuttle-Service folgen später auf der Website.',

    'rsvp.aria':       'Teilnahmebestätigung',
    'rsvp.message':    'Bitte bestätigt eure Teilnahme bis Dienstag, den 30. Juni',
    'rsvp.btn':        'Teilnahme bestätigen',
    'rsvp.btnAria':    'Bestätige deine Teilnahme — öffnet Google Forms in neuem Tab',
    'rsvp.presence':   'Eure Anwesenheit ist das Wichtigste, um diesen Tag unvergesslich zu machen!',
    'rsvp.giftText':   'Falls einige von euch uns ein Geschenk machen möchten, könnt ihr zu unserem Traum beitragen, ein Haus im Grünen unserer Hügel zu kaufen.',
    'rsvp.ibanAria':   'IBAN — zum Kopieren anklicken',
    'rsvp.ibanHolder': 'Kontoinhaber',
    'rsvp.ibanBank':   'Bank',
    'rsvp.ibanHint':   'zum Kopieren der IBAN anklicken',
    'rsvp.ibanCopied':   'kopiert ✓',
    'rsvp.ibanSelected': 'ausgewählt',

    'gift.aria': 'Geschenk',

    'cd.today': 'es ist soweit!',
    'cd.one':   ' noch 1 Tag!',
    'cd.many':  ' noch {n} Tage!',
  },
};

const currentLang = () => (document.documentElement.lang === 'de' ? 'de' : 'it');
const t = (key) => (I18N[currentLang()][key] ?? I18N.it[key] ?? '');


// ────────────────────────────────────────────────────────────────
// LANGUAGE SWITCH — apply a language to the whole page
// ────────────────────────────────────────────────────────────────
function setLanguage(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = dict[el.getAttribute('data-i18n')];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const v = dict[el.getAttribute('data-i18n-html')];
    if (v != null) el.innerHTML = v;
  });
  ['aria-label', 'title', 'alt'].forEach((attr) => {
    document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
      const v = dict[el.getAttribute(`data-i18n-${attr}`)];
      if (v != null) el.setAttribute(attr, v);
    });
  });

  // JS-generated, language-dependent content
  setCountdown(lang);

  // Reflect the active flag
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  try { localStorage.setItem('lang', lang); } catch { /* private mode */ }
}

// Pick the initial language. Priority:
//   1. An explicit saved choice (the visitor used the flag toggle before) always wins.
//   2. Otherwise auto-detect: German if the browser/device language is German
//      (de, de-DE, de-AT, de-CH…), the reliable client-side signal — a German
//      relative's phone/browser is set to German. Everyone else (Italy, US,
//      anywhere non-German) gets Italian.
// NOTE: true IP-based geolocation ("connection in Germany") is not possible on a
// static page without a third-party API call; the browser language covers it in practice.
function detectLanguage() {
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch { /* private mode */ }
  if (saved === 'de' || saved === 'it') return saved;

  const langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || ''];
  const prefersGerman = langs.some((l) => /^de(-|$)/i.test(l));
  return prefersGerman ? 'de' : 'it';
}

function initLangSwitch() {
  const initial = detectLanguage();

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  setLanguage(initial);
}


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
    photoImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.03)`;

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
// Falls back to native text selection if Clipboard API unavailable.
// Feedback + restored hint follow the active language.
// ────────────────────────────────────────────────────────────────
function initIbanCopy() {
  const block   = document.getElementById('ibanBlock');
  const valueEl = document.getElementById('ibanValue');
  const hintEl  = block ? block.querySelector('.iban-hint') : null;

  if (!block || !valueEl || !hintEl) return;

  block.addEventListener('click', async () => {
    const text = valueEl.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      showFeedback(t('rsvp.ibanCopied'), 'rgba(139, 115, 85, 0.18)');
    } catch {
      const range = document.createRange();
      range.selectNode(valueEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      showFeedback(t('rsvp.ibanSelected'), '');
    }
  });

  function showFeedback(message, bgColor) {
    hintEl.textContent = message;
    if (bgColor) block.style.background = bgColor;

    clearTimeout(block._copyTimer);
    block._copyTimer = setTimeout(() => {
      hintEl.textContent     = t('rsvp.ibanHint');
      block.style.background = '';
    }, 2200);
  }
}


// ────────────────────────────────────────────────────────────────
// COUNTDOWN — calendar-date based, localized to the active language
// ────────────────────────────────────────────────────────────────
function setCountdown(lang) {
  const target = document.querySelector('.countdown-footer__text');
  if (!target) return;

  const startOfDay  = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const WEDDING_DAY = startOfDay(new Date(2026, 8, 12));
  const today       = startOfDay(new Date());
  const days        = Math.round((WEDDING_DAY - today) / 86400000);

  const dict = I18N[lang] || I18N.it;
  const locale = lang === 'de' ? 'de-DE' : 'it-IT';

  let label = '';
  if (days < 0)        label = '';
  else if (days === 0) label = dict['cd.today'];
  else if (days === 1) label = dict['cd.one'];
  else                 label = dict['cd.many'].replace('{n}', days.toLocaleString(locale));

  target.textContent = label;
}


// ────────────────────────────────────────────────────────────────
// MAP FADE — mask the iframe white-flash with a fade-in
// ────────────────────────────────────────────────────────────────
function initMapFade() {
  const iframe = document.querySelector('.location-map iframe');
  if (!iframe) return;
  if (iframe.complete) iframe.classList.add('is-loaded');
  else iframe.addEventListener('load', () => iframe.classList.add('is-loaded'), { once: true });
}


// ────────────────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLangSwitch();   // sets text, dateline, countdown, flag state
  initParallax();
  initIbanCopy();
  initMapFade();
});
