# Wedding Landing Page — temporgsite

Static GitHub Pages wedding invitation for Gino & Gina, 12 Sep 2026, Chieri (TO).

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
- Hero (section 1): `--clr-ivory` #FAF7F2
- Location (section 2): `--clr-sage` #C8D8C5
- RSVP (section 3): `--clr-ivory` base with spotlight filter (default = hero's hover look; hover = hero's default)

## Hover system
Spotlight effect via `:has()` — dimming siblings, brightening hovered section. RSVP has inverted filter behavior (bright at rest, neutral on hover).

## Fonts
Cormorant Garamond (display) + Raleway (body) via Google Fonts. Preloaded to reduce FOUT.

## Placeholders (must update before production)
- Hero photo: currently picsum placeholder
- Google Forms RSVP URL
- IBAN value
- Google Maps embed coordinates
