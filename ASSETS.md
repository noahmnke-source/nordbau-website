# Assets: Eigene Fotos & Videos einbinden

Die Website läuft aktuell mit **verifizierten Unsplash-Stand-ins** (Register:
`src/data/assets.ts`). Ihre echten Projektfotos und das Hero-Video ersetzen die
Stand-ins Schritt für Schritt — die Seite funktioniert in jedem Zwischenzustand.

## 1. Hero-Video (Startseite)

Die Startseite hat einen fertigen Video-Slot (`src/components/VideoHero.astro`).
Solange kein Video liegt, wird automatisch das Poster-Bild gezeigt.

1. Video komprimieren: H.264 (MP4), 1920×1080, 24–30 fps, **ohne Tonspur**,
   Ziel ≤ 8 MB (z. B. mit HandBrake, Preset „Web/Vimeo YouTube HQ 1080p", RF 26–28).
2. Datei speichern als: `public/videos/hero.mp4`
3. Fertig — beim nächsten Build spielt der Hero das Video (lazy, mit Poster,
   `prefers-reduced-motion` pausiert es automatisch).

Optional eigenes Poster: Standbild als JPG exportieren, unter
`public/videos/hero-poster.jpg` ablegen und in `src/pages/index.astro` die
`poster`-Prop auf `{ src: '/videos/hero-poster.jpg', alt: '…' }` ändern.

## 2. Ihre drei Baustellenfotos (Referenzen)

Die beiden echten Projekte sind bereits als Case Studies angelegt und mit
`standIn: true` markiert:

| Ihr Foto | Ziel-Datei (Vorschlag) | Verwendet in |
|---|---|---|
| Neubau, Winter, Gerüst + frisch gedecktes Dach | `src/assets/projekte/birkenallee-rohbau.jpg` | `src/content/referenzen/haus-birkenallee.md` (hero) |
| Drohne: Aufstockung, offener Dachstuhl (Weitwinkel) | `src/assets/projekte/donauufer-drohne-1.jpg` | `src/content/referenzen/aufstockung-donauufer.md` (hero) |
| Drohne: Aufstockung, Holzfassade frontal | `src/assets/projekte/donauufer-drohne-2.jpg` | `aufstockung-donauufer.md` (gallery) |

**So tauschen Sie:**

1. Ordner anlegen: `src/assets/projekte/` und die JPGs dort ablegen
   (Originalauflösung; Astro optimiert beim Build).
2. In der jeweiligen Referenz-Datei den `hero`/`gallery`-Eintrag ändern, z. B.:

   ```yaml
   hero:
     src: "~/assets/projekte/birkenallee-rohbau.jpg"   # statt Unsplash-URL
     alt: "Rohbau im Winter: frisch gedecktes Dach unter blauem Himmel, Gerüst an der Putzfassade"
     standIn: false
   ```

   > Hinweis: Für lokale Bilder rendert `Figure.astro` das Bild direkt
   > (`src` beginnt nicht mit `https://images.unsplash.com/`, daher kein
   > Unsplash-srcset). Wer astro:assets-Optimierung für lokale Dateien möchte,
   > importiert das Bild in der Seite und nutzt `<Image />` — oder legt die
   > Dateien einfach unter `public/projekte/` ab und referenziert `/projekte/….jpg`.

3. `npm run build` — fertig.

## 3. Weitere Stand-ins ersetzen

Alle übrigen Bilder zentral in `src/data/assets.ts`: URL gegen eigenen Pfad
tauschen, `alt`-Text anpassen — jede Seite übernimmt die Änderung automatisch.
Einträge mit `standIn: true` sind die, die am dringendsten echte Projektfotos
verdienen (Baustelle/Handwerk).

## 4. Platzhalter, die vor Launch getauscht werden MÜSSEN

- `src/config/site.ts` — Firmenname „AEDIS Haus", Kontaktdaten, Formular-Endpoint
- `astro.config.mjs` — `site` (Domain) + `public/robots.txt` Sitemap-URL
- `src/pages/impressum.astro` + `src/pages/datenschutz.astro` — Rechtstexte
- Zahlen auf Startseite/Über uns (mit `TODO` kommentiert)
