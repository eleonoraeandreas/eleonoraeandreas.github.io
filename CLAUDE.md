# Wedding Landing Page — temporgsite

Static GitHub Pages wedding invitation for Eleonora & Andreas, 12 Sep 2026, Torino (TO).

## Stack
Pure HTML / CSS / JS — no frameworks. CSS Grid + Custom Properties + clamp() fluid sizing.

## Structure
- `index.html` — single-page layout
- `css/style.css` — all styles, responsive breakpoints, animations
- `js/main.js` — parallax, IBAN copy, countdown

## Layout
Page is vertically scrollable on every viewport:
- **Hero** takes the full viewport height (`100dvh`, `100svh` on mobile).
- **Right panel** (historical name, kept) sits below the hero and contains location + RSVP side by side on wide screens, stacked below 900px.
- Sections grow to fit content — no more fixed-height straitjacket, no internal scrolling, no flex-shrink hacks. If adding content, just trust it.

Previously this was a two-column no-scroll design (hero left, location+RSVP stacked right). That forced us to aggressively densify RSVP. The new scrolling layout removed all of that complexity.

## Color scheme
- Hero (section 1): `--clr-ivory` #FAF7F2 (mobile uses `--clr-ivory-warm` for a warmer feel)
- Location (section 2): `--clr-sage` #C8D8C5, layered over the architectural sketch (`img/20260320_1244_Elegant Architectural Sketch…png`) with an 82% sage overlay so text stays legible.
- RSVP (section 3): `--clr-ivory-warm` #F3EDE1 — intentionally different from hero so they don't look identical when the location spotlight dims them.

## Hover system
Spotlight effect via `.layout:has(.section:hover)` — non-hovered siblings get `filter: brightness(0.97)`, the hovered one gets `filter: none` + `box-shadow`. Saturation is NOT bumped on hover (previously tried `saturate(1.05)` — read as too yellow/bright). Keep it subtle.

## Fonts & scale
- Cormorant Garamond (display) + Raleway (body) via Google Fonts. Preloaded to reduce FOUT.
- Root `font-size` uses a viewport-scaled clamp (`clamp(106.25%, 0.95rem + 0.2vw, 118.75%)`). This lifts every rem-based text clamp on larger screens without overflowing the fixed-height right panel. Do NOT raise the max further — past ~119% the RSVP section overflows.

## Mobile viewport — use svh, NOT dvh
Chrome Android jitters when `dvh` recomputes as the URL bar hides/shows on scroll. The mobile (≤767px) hero and section min-heights use `svh` (small viewport) to stay stable. Keep this.

## RSVP content
Header → message → CTA → presence line → hr → gift text → 3-row IBAN block. No trailing footer (removed — was duplicating the hero's "Con tutto il nostro affetto" line). IBAN block is a `<button>` wrapping three `.iban-row` label/value pairs; click/tap anywhere inside copies the IBAN via `initIbanCopy` in [js/main.js](js/main.js).

## Map iframe
Must use the embeddable URL form (`https://www.google.com/maps?q=…&output=embed`). The `/maps/place/…` URL sets `X-Frame-Options: sameorigin` and will not render.

## Countdown (js/main.js)
Calendar-date based (not ms-diff + `Math.ceil`, which was wrong on the wedding day itself):
- 0 days → "oggi è il giorno!"
- 1 day  → "manca 1 giorno"
- >1     → "mancano N giorni"
- past   → render nothing

## Placeholders (must update before production)
- Hero photo (currently picsum seed `eleonora-andreas`)
- Google Forms RSVP URL
- IBAN value, intestatario name, banca
- Parking / shuttle details copy
- Actual map coordinates (if the Villa Bogiet address needs adjusting)
