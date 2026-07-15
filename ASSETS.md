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

## 2a. Neue Referenz hinzufügen (aktueller Stand)

Die Referenzen-Seite zeigt pro Projekt alle Fotos und darunter „Ort: Titel".
Format und Layout bleiben automatisch erhalten — du brauchst nur zwei Dinge:

**1) Bilder ablegen** unter `public/projekte/` in drei Breiten (für srcset):
`<name>-640.webp`, `<name>-1024.webp`, `<name>-1600.webp`

Erzeugen (im Projektordner, Bild vorher irgendwo ablegen):

```bash
node -e "const s=require('sharp');for(const w of [640,1024,1600])s('DEIN-BILD.jpg').resize({width:w}).webp({quality:72}).toFile('public/projekte/NAME-'+w+'.webp')"
```

**2) Referenz anlegen**: neue Datei `src/content/referenzen/<slug>.md`, z. B.:

```yaml
---
title: Einfamilienhaus im Bau
ort: München            # optional – ohne ort entfällt der "Ort: "-Teil
jahr: 2026
kategorie: Neubau       # Neubau | Stadtvilla | Bungalow | Aufstockung | Bauhaus | Doppelhaus
order: 2                # Reihenfolge auf der Seite
hero:
  src: "/projekte/NAME-1600.webp"   # immer die 1600er referenzieren
  alt: "Aussagekräftiger Alt-Text"
gallery:
  - src: "/projekte/NAME2-1600.webp"
    alt: "..."
facts: {}               # optional: wohnflaeche / bauzeit / energiestandard
seoTitle: "..."
seoDescription: "..."
---

Fließtext (optional).
```

Aktuelles Projekt: `src/content/referenzen/muenchen-einfamilienhaus.md`.

## 2b. Frühere Notiz zu den ersten Baustellenfotos

Alle drei Fotos zeigen dasselbe Haus. Sie sind als EIN Bautagebuch-Projekt
angelegt — ohne Ortsangabe — in `src/content/referenzen/bautagebuch-einfamilienhaus.md`,
alle drei Slots mit `standIn: true` markiert:

| Ihr Foto | Ziel-Datei (Vorschlag) | Slot |
|---|---|---|
| Winter: Gerüst, frisch gedecktes Dach | `public/projekte/bautagebuch-01.jpg` | `hero` |
| Drohne: offener Dachstuhl (Weitwinkel) | `public/projekte/bautagebuch-02.jpg` | `gallery[0]` |
| Drohne: Holzfassade frontal | `public/projekte/bautagebuch-03.jpg` | `gallery[1]` |

**So tauschen Sie:**

1. Fotos fürs Web exportieren (JPG, ~2.500 px Breite reicht — die Originale
   mit > 100 MB bitte nicht direkt einbinden) und unter `public/projekte/` ablegen.
2. In `bautagebuch-einfamilienhaus.md` die drei Einträge ändern, z. B.:

   ```yaml
   hero:
     src: "/projekte/bautagebuch-01.jpg"   # statt Unsplash-URL
     alt: "Rohbau im Winter: frisch gedecktes Dach unter blauem Himmel, Gerüst an der Putzfassade"
     standIn: false
   ```

3. Im selben Zug die `TODO`-Kommentare in der Datei prüfen: echte Eckdaten
   (Wohnfläche, Bauzeit, ggf. Ort) ergänzen, sobald Sie sie nennen möchten.

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

- `src/config/site.ts` — Domain, Kontaktdaten, Formular-Endpoint
- `astro.config.mjs` — `site` (Domain) + `public/robots.txt` Sitemap-URL
- `src/pages/impressum.astro` + `src/pages/datenschutz.astro` — Rechtstexte
- Zahlen auf Startseite/Über uns (mit `TODO` kommentiert)
