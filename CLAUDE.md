# Wedding Landing Page — temporgsite

Static GitHub Pages wedding invitation for Eleonora & Andreas, 12 Sep 2026, Torino (TO).

## Stack
Pure HTML / CSS / JS — no frameworks. CSS Grid + Custom Properties + clamp() fluid sizing.

## Structure
- `index.html` — single-page layout
- `css/style.css` — all styles, responsive breakpoints, animations
- `js/main.js` — parallax, IBAN copy, countdown

## Layout
- **Desktop:** 3fr hero (left) | 2fr right panel (location top + RSVP bottom) — no scroll
- **Tablet portrait (≤1024px):** hero top 58dvh | location + RSVP side-by-side bottom 42dvh
- **Tablet landscape (768–1199px):** same as desktop, tighter spacing
- **Mobile (≤767px):** single column, scrollable

## Color scheme
Sections must read as three distinct colors even under the hover spotlight:
- Hero (section 1): `--clr-ivory` #FAF7F2
- Location (section 2): `--clr-sage` #C8D8C5
- RSVP (section 3): `--clr-ivory-warm` #F3EDE1 — intentionally different from hero so they don't look identical when the location spotlight dims them

## Hover system
Spotlight effect via `.layout:has(.section:hover)` — non-hovered siblings get `filter: brightness(0.97)`, the hovered one gets `filter: none` + `box-shadow`. Saturation is NOT bumped on hover (previously tried `saturate(1.05)` — read as too yellow/bright). Keep it subtle.

## Fonts & scale
- Cormorant Garamond (display) + Raleway (body) via Google Fonts. Preloaded to reduce FOUT.
- Root `font-size` uses a viewport-scaled clamp (`clamp(106.25%, 0.95rem + 0.2vw, 118.75%)`). This lifts every rem-based text clamp on larger screens without overflowing the fixed-height right panel. Do NOT raise the max further — past ~119% the RSVP section overflows.

## Mobile viewport — use svh, NOT dvh
Chrome Android jitters when `dvh` recomputes as the URL bar hides/shows on scroll. The mobile (≤767px) hero and section min-heights use `svh` (small viewport) to stay stable. Keep this.

## RSVP density
RSVP is the tightest section — header + message + CTA + presence line + hr + gift text + 3-row IBAN block + footer thanks. All children use `flex-shrink: 0` so they keep natural height; `.section--rsvp .section-body` has `overflow: hidden` and scoped tighter font-size / padding / gap overrides so the whole section fits without scrolling at any viewport. If you add content to RSVP, expect to re-tune these overrides.

## Map iframe
Must use the embeddable URL form (`https://www.google.com/maps?q=…&output=embed`). The `/maps/place/…` URL sets `X-Frame-Options: sameorigin` and will not render.

## Countdown (js/main.js)
Calendar-date based (not ms-diff + `Math.ceil`, which was wrong on the wedding day itself):
- 0 days → "oggi è il giorno!"
- 1 day  → "manca 1 giorno"
- >1     → "mancano N giorni"
- past   → render nothing

## Placeholders (must update before production)
- Hero photo
- Google Forms RSVP URL
- IBAN value, intestatario name, banca
- Parking / shuttle details copy
- Actual map coordinates (if Villa Bogiet address needs adjusting)
