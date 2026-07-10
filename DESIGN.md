# Design

Editorial-architektonischer Premium-Stil. Weiße Galerie-Wand, anthrazitfarbene Architektur, ein einziger Corten-/Oxblood-Akzent. Die Fotografie trägt die Seite; Typografie ist gebaut, nicht dekoriert.

**Mood-Satz:** Rohbau im Winterlicht — Sichtbeton, geöltes Eichenholz, ein Schnitt Cortenstahl.

## Farbstrategie

Restrained auf Weiß, mit Committed-Momenten: ganze Sektionen (Zahlen, Abschluss-CTA, Footer) drenchen in Anthrazit; der Oxide-Akzent bleibt unter 10 % der Fläche und markiert ausschließlich Handlung und Orientierung (CTAs, aktive Zustände, Marker, Selektion).

## Farb-Tokens (OKLCH, definiert in `src/styles/global.css` via Tailwind 4 `@theme`)

| Token | Wert | Rolle |
|---|---|---|
| `--color-bg` | `oklch(1 0 0)` | Seitengrund, pures Weiß |
| `--color-stone` | `oklch(0.962 0.004 30)` | Wechsel-Sektionen, minimal warmgrauer Stein |
| `--color-ink` | `oklch(0.24 0.006 30)` | Text, Anthrazit (≈13:1 auf Weiß) |
| `--color-graphite` | `oklch(0.205 0.006 30)` | Drench-Sektionen, Footer |
| `--color-muted` | `oklch(0.44 0.01 30)` | Sekundärtext (≥7:1 auf Weiß) |
| `--color-oxide` | `oklch(0.45 0.15 20)` | Der eine Akzent: Corten/Oxblood. Immer mit weißem Text |
| `--color-oxide-deep` | `oklch(0.38 0.135 20)` | Hover/Active des Akzents |
| `--color-line` | `oklch(0.885 0.005 30)` | Hairlines, Tabellenlinien |
| `--color-paper` | `oklch(0.97 0.004 30)` | Text auf Graphite |
| `--color-paper-muted` | `oklch(0.78 0.008 30)` | Sekundärtext auf Graphite (≥4,5:1) |

Regeln: Kein Hex. Weißer Text auf Oxide (Helmholtz-Kohlrausch). Auf Graphite bekommt heller Text +0.05 line-height.

## Typografie

- **Display: Boska Variable** (Fontshare, self-hosted `public/fonts/Boska-Variable.woff2`). Gemeißelte, scharfe Serifen — Stein, nicht Magazin. Gewicht 350–500, upright (kein Italic-Display), letter-spacing ≥ −0.02em.
- **Text/UI: Switzer Variable** (+ Italic). Schweizer Grotesk — Beschilderung, Präzision. Body 400–450, Labels/Buttons 500.
- Skala (fluid, Ratio ≈ 1.3): Hero `clamp(2.75rem, 6.5vw, 5.25rem)`, H2 `clamp(2rem, 4vw, 3.25rem)`, H3 `clamp(1.375rem, 2vw, 1.75rem)`, Body `1.0625rem/1.7`, Small `0.9375rem`, Caption `0.8125rem`.
- `text-wrap: balance` auf h1–h3, `text-wrap: pretty` auf Prosa. Zeilenlänge ≤ 68ch.
- Ziffern in Zahlen-Kontexten: Switzer mit `font-variant-numeric: tabular-nums`.

## Layout

- Container `max-width: 82.5rem` (1320px), Gutter `clamp(1.25rem, 4vw, 3rem)`. 12-Spalten-Denkweise, asymmetrisch besetzt (Text 5–6 Spalten versetzt, Bilder überbreit oder angeschnitten bis zur Kante).
- Sektionsabstand `clamp(5rem, 12vh, 9rem)`, bewusst variiert; enge Gruppierungen innerhalb.
- Keine identischen Karten-Raster: Haustypen als alternierende Editorial-Zeilen, Referenzen als asymmetrisches Galerie-Raster mit wechselnden Formaten.
- Zahlen/Trust als typografisches "Bautagebuch"-Register (Hairline-Tabelle), nicht als Stat-Karten.
- Z-Skala: `--z-sticky: 20`, `--z-overlay: 30`, `--z-modal: 40`, `--z-toast: 50`.

## Bildsprache

Architekturfotografie mit Licht und Material, keine Deko-Thumbnails. Formate variieren (3:2, 4:5, 21:9-Anschnitte). Stand-ins von Unsplash (verifiziert), zentrale Zuordnung in `src/data/assets.ts` — echte Projektfotos ersetzen die Stand-ins dateiweise (siehe `ASSETS.md`). Hero: Video-Slot mit Poster, lazy, `public/videos/hero.mp4` (kommt vom Kunden).

## Motion

Eine orchestrierte Hero-Sequenz beim Laden (Poster → Headline-Zeilen versetzt, 600ms, ease-out-expo). Scroll-Reveals sparsam und inhaltsspezifisch (Bilder: Clip-Reveal von unten; Text: 16px Rise + Fade), nur via `.js`-Klasse — ohne JS ist alles sichtbar. Hover: Links mit wachsender Unterstreichung (`background-size`), Bilder `scale(1.03)` über 900ms, Button-Pfeil-Nudge. Alles `prefers-reduced-motion`-gesichert (instant/Crossfade).

## Komponenten

- **Button**: primär (Oxide-Fläche, weißer Text, Pfeil), sekundär (Ink-Hairline, transparenter Grund), auf Graphite invertiert. Höhe 3rem, Radius 0 (gebaut, nicht gerundet).
- **Header**: sticky, startet transparent über Hero, wird nach 1 Viewport weiß mit Hairline. Rechts permanenter CTA "Beratung vereinbaren". Mobile: Vollbild-Overlay in Graphite.
- **SectionIntro**: H2 + max. 2 Sätze Vorlauf, asymmetrisch gesetzt. Kein Eyebrow-Automatismus.
- **FAQ**: `<details>`-Akkordeon mit Hairlines und Plus/Minus-Marker.
- **Formular**: Labels über Feldern, 1px Ink-Border, Fokus = 2px Oxide-Outline, Fehler in Textform unter dem Feld.
- **Breadcrumbs**: nur auf Unterseiten, klein, muted, mit BreadcrumbList-JSON-LD.
