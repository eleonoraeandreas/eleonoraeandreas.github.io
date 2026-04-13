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

### Map load delay (known limitation — partially mitigated)
Google's embed ships ~800KB–1.5MB of JS + tiles, so there's an inherent delay before the map paints. What's in place (quick-win):
- `preconnect` hints to `google.com`, `maps.google.com`, `maps.gstatic.com`, `khms0/1.google.com` in `<head>`.
- `loading="eager"` + `fetchpriority="high"` on the iframe so the fetch starts at page load, not on scroll.
- `.location-map` container has a sage background and the iframe fades in via `is-loaded` class (`initMapFade` in [js/main.js](js/main.js)) so the white-flash is masked rather than eliminated.

**Possible future improvement — facade pattern:** replace the iframe with a static image (the architectural sketch, or a Maps Static API screenshot) and swap in the live iframe only on click/tap. Fully eliminates the delay at the cost of one user click. Worth considering if load time still feels off in production on slow mobile.

## Countdown
Lives in the footer (`.countdown-footer`), English, calendar-date based (not ms-diff + `Math.ceil`):
- 0 days  → "it's the day!"
- 1 day   → "1 day to go!"
- >1      → "N days to go!"
- past    → render nothing (footer stays empty)

Hero `.hero__dateline` is populated by JS with the date only ("Sabato 12 Settembre 2026") — no time, no countdown there anymore.

## Location text
Dark warm brown (`--clr-text` #3A2E26) over the sage+sketch backdrop. We tried (a) ivory/white text and (b) a lighter overlay with darker text — both landed wrong. The original sage overlay (60%) + dark text is the agreed look; do not flip the contrast again without asking.

## Placeholders (must update before production)
- Hero photo (currently picsum seed `eleonora-andreas`)
- Google Forms RSVP URL
- IBAN value, intestatario name, banca
- Parking / shuttle details copy
- Actual map coordinates (if the Villa Bogiet address needs adjusting)
