# Fertighaus-Website (AEDIS Haus — Platzhalter-Marke)

Premium-Marketing-Website für einen Fertighaus-Anbieter: Astro 5 + Tailwind 4 +
TypeScript, statisch gebaut, SEO-/GEO-optimiert für bundesweiten Vertrieb.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Dev-Server auf `localhost:4321` |
| `npm run build` | Produktions-Build nach `dist/` |
| `npm run preview` | Build lokal testen |
| `npm run check` | Astro/TypeScript-Prüfung |

## Struktur

```
src/
  config/site.ts        ← Firmenname, Kontakt, Formular-Endpoint (PLATZHALTER!)
  data/assets.ts        ← zentrales Bildregister (verifizierte Stand-ins)
  styles/global.css     ← Design-Tokens (OKLCH), Utilities, Motion
  layouts/BaseLayout.astro  ← SEO-Head, JSON-LD (@graph), Header/Footer
  components/           ← Button, Figure, SectionIntro, FaqAccordion, Prose, …
  content/              ← Collections: haustypen, referenzen, standorte, ratgeber
  pages/                ← Startseite, Haustypen, Referenzen, Ablauf, Über uns,
                          /fertighaus/ (GEO-Regionsseiten), Ratgeber, Kontakt
docs/research/          ← Wettbewerbs-/Keyword-/GEO-/Schema-Recherche (Quellen)
```

## Vor dem Launch

Siehe **ASSETS.md** (eigene Fotos/Hero-Video einbinden) und die dort gelistete
Platzhalter-Checkliste: Firmenname, Domain, Formular-Endpoint, Rechtstexte,
echte Kennzahlen.

## Design-Grundsätze

PRODUCT.md (Strategie) und DESIGN.md (visuelles System) sind verbindlich.
Farben nur als OKLCH-Tokens aus `global.css`; Bilder nur über `Figure` aus dem
Asset-Register; jede Seite genau eine `h1`, ein primärer CTA.
