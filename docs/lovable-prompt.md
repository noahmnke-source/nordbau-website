Baue eine hochwertige, konversionsstarke Marketing-Website für die **Hochpuls GmbH**, einen deutschen Anbieter von Fertighäusern (schlüsselfertig & individuell geplant, bundesweiter Vertrieb). Zielgruppe: kaufkräftige Bauinteressenten (30–55, überdurchschnittliches Einkommen). Die Seite muss Premium wirken – editorial-architektonisch, ruhig, präzise. Kein Template-Look, keine SaaS-Landingpage-Ästhetik.

Sprache: durchgehend Deutsch (Sie-Form). Alle Texte, Meta-Daten und Alt-Texte auf Deutsch.

═══════════════════════════════════════════
TECH-STACK
═══════════════════════════════════════════
React + TypeScript + Vite + Tailwind CSS. react-router-dom für Routing. react-helmet-async für per-Seite Meta-Tags und JSON-LD. Statisch, schnell, SEO-optimiert. Mobile-first, voll responsive. Kein Component-Wildwuchs – ein sauberes, wiederverwendbares Komponentensystem.

═══════════════════════════════════════════
MARKE & TONALITÄT
═══════════════════════════════════════════
Persönlichkeit: gebaut, ruhig, präzise. Die Marke spricht wie ein Architekt, nicht wie ein Verkäufer – kurze Sätze, konkrete Zahlen, keine Superlative ohne Beleg. Emotion beim Besucher: ruhige Gewissheit ("die haben es im Griff"), kein Kaufdruck. Warmherzigkeit kommt aus Fotografie und Materialsprache (Holz, Stein, Corten), nie aus Floskeln.

Floskel-Blacklist (verboten): "Traum vom Eigenheim", "Wohnträume verwirklichen", "alles aus einer Hand", "Qualität, die überzeugt". Stattdessen belegbare Aussagen: 5 Jahre Gewährleistung, 12 Monate Festpreisgarantie, Effizienzhaus 40 ab Werk.

ABSOLUTE NO-GOS (Anti-Slop):
- Keine seitlichen Akzentstreifen (border-left/right als farbige Kante) auf Karten/Callouts.
- Kein Gradient-Text (background-clip: text). Emphasis nur über Größe/Gewicht.
- Kein Glassmorphism/backdrop-blur als Deko.
- Keine identischen Icon-Karten-Raster (Icon + Heading + Text, endlos wiederholt).
- Keine kleinen uppercase-getrackten Eyebrow-Labels über jeder Sektion.
- Kein Hero-Metrik-Template (große Zahl, kleines Label, Gradient).
- Keine Emojis, keine Zähler-Widgets, kein Slider-Hero mit rotierenden Versprechen.
- Nummerierte Marker (01/02/03) NUR für echte Sequenzen (Prozessschritte), nie als Sektions-Deko.
Zahlen/Fakten werden als typografisches Hairline-Register dargestellt (dünne Trennlinien, tabellarische Ziffern), NICHT als Stat-Karten.

═══════════════════════════════════════════
DESIGN-SYSTEM
═══════════════════════════════════════════
Stil: editorial-architektonisch. Weiße Galerie-Wand, anthrazitfarbene Architektur, ein einziger Corten-/Oxblood-Akzent. Viel Weißraum, ruhiges asymmetrisches Grid, große Typografie. Die Fotografie trägt die Seite; Layout und Typografie rahmen sie nur.

FARBEN (als CSS Custom Properties in OKLCH in :root definieren, dann Tailwind-Farben darauf mappen):
--bg: oklch(1 0 0)            /* pures Weiß, Seitengrund */
--stone: oklch(0.962 0.004 30) /* warmgrauer Wechsel-Hintergrund für Sektionen */
--ink: oklch(0.24 0.006 30)    /* Anthrazit, Fließtext (~13:1 auf Weiß) */
--graphite: oklch(0.205 0.006 30) /* dunkle Drench-Sektionen, Footer */
--muted: oklch(0.44 0.01 30)   /* Sekundärtext (≥7:1 auf Weiß) */
--oxide: oklch(0.45 0.15 20)   /* DER EINE Akzent: Corten/Oxblood. IMMER mit weißem Text */
--oxide-deep: oklch(0.38 0.135 20) /* Hover/Active des Akzents */
--line: oklch(0.885 0.005 30)  /* Hairlines, Tabellenlinien */
--paper: oklch(0.97 0.004 30)  /* heller Text auf Graphite */
--paper-muted: oklch(0.78 0.008 30) /* Sekundärtext auf Graphite (≥4,5:1) */
Regeln: Kein Hex. Weißer Text auf dem Oxide-Akzent (nie dunkel). Der Akzent markiert AUSSCHLIESSLICH Handlung/Orientierung (CTAs, aktive Zustände, Marker, Textselektion) und bleibt unter 10 % der Fläche. Ganze Sektionen (Zahlen, Abschluss-CTA, Footer) dürfen in Graphite "drenchen".

TYPOGRAFIE (Fonts via Fontshare-CSS-API laden: <link href="https://api.fontshare.com/v2/css?f[]=boska@300,400,500&f[]=switzer@400,500&display=swap" rel="stylesheet">):
- Display/Headlines: "Boska" (gemeißelte, scharfe Serife – Stein, nicht Magazin). Gewicht 400–500, upright (kein Italic-Display), letter-spacing ≥ -0.02em.
- Text/UI: "Switzer" (Schweizer Grotesk). Body 400, Labels/Buttons 500.
- Fluide Skala (clamp): Hero clamp(2.75rem,6.5vw,5.25rem)/lh 1.04; H2/Display clamp(2rem,4vw,3.25rem)/lh 1.08; H3/Title clamp(1.375rem,2vw,1.75rem)/lh 1.2; Body 1.0625rem/lh 1.7; Small 0.9375rem; Caption 0.8125rem.
- text-wrap: balance auf h1–h3, text-wrap: pretty auf Prosa. Zeilenlänge ≤ 68ch. Zahlen mit font-variant-numeric: tabular-nums.

LAYOUT:
- Container max-width 82.5rem (1320px), Gutter clamp(1.25rem,4vw,3rem). 12-Spalten-Denkweise, asymmetrisch besetzt (Text 5–7 Spalten, versetzt; Bilder überbreit oder bis zur Kante angeschnitten).
- Sektionsabstand clamp(5rem,12vh,9rem), bewusst variiert; enge Gruppierungen innerhalb.
- Karten sind die faule Antwort – nur wo sie die beste Affordanz sind. Haustypen als alternierende Editorial-Zeilen (Bild groß / Text versetzt, nächste Zeile gespiegelt). Referenzen als asymmetrisches Galerie-Raster mit wechselnden Formaten (aspect-[3/2], [4/5], [4/3], [21/9], square).

MOTION:
- Eine orchestrierte Hero-Ladesequenz: Headline-Zeilen steigen versetzt auf (translateY + fade, ~600–800ms, ease-out-expo cubic-bezier(0.16,1,0.3,1), gestaffelte delays).
- Scroll-Reveals sparsam und inhaltsspezifisch (Text: 16px Rise + Fade; Bilder: Clip-Reveal von unten via clip-path). Über IntersectionObserver. Inhalt ist im Default sichtbar – Reveals veredeln nur, blockieren nie die Sichtbarkeit.
- Hover: Links mit wachsender Unterstreichung (background-size 0→100% 1px), Bilder scale(1.03) über ~900ms, Button-Pfeil rückt 4px nach rechts.
- prefers-reduced-motion: alle Animationen auf instant/Crossfade reduzieren. Pflicht.

KOMPONENTEN:
- Button: primär (Oxide-Fläche, weißer Text, Pfeil-Icon), sekundär (Ink-Hairline-Border, transparent), invertiert für Graphite-Sektionen. Höhe 3rem, RADIUS 0 (gebaut, nicht gerundet – die ganze Seite meidet abgerundete Ecken).
- Header: sticky. Auf Seiten mit dunklem Hero startet er transparent über dem Hero und wird nach ~24px Scroll weiß mit Hairline-Border. Logo (Wortmarke "Hochpuls" in Boska) links, Navigation mittig/rechts, permanenter CTA "Beratung vereinbaren" ganz rechts. Mobile: Hamburger → Vollbild-Overlay in Graphite mit großen Boska-Links.
- Footer: Graphite. Oben große Abschluss-CTA-Zeile ("Sprechen wir über Ihr Grundstück, Ihr Budget und den Weg zu Ihrem Haus." + Button). Darunter Linkspalten (Navigation, Haustypen, Regionen, Kontakt/Adresse). Unten Rechtszeile (© Jahr, Impressum, Datenschutz).
- Figure: responsive Bild mit sizes-Attribut, lazy-load (Hero eager), object-cover, optionaler Zoom-on-Hover, optionale Caption.
- SectionIntro: H2 + max. 2 Sätze Vorlauf, asymmetrisch gesetzt. KEIN Eyebrow-Label.
- FAQ: Akkordeon auf <details>-Basis (tastaturbedienbar, ohne JS funktionsfähig), Hairlines, Plus/Minus-Marker in Oxide.
- Breadcrumbs: klein, muted, nur auf Unterseiten.

═══════════════════════════════════════════
SEITEN & ROUTING
═══════════════════════════════════════════
/                                Startseite
/haustypen                       Haustypen-Übersicht
/haustypen/:slug                 6 Haustyp-Detailseiten
/referenzen                      Projektgalerie
/referenzen/:slug                Case-Study-Detailseiten
/ablauf                          "So bauen wir"
/ueber-uns                       Über uns
/fertighaus                      GEO-Hub "Fertighaus in Ihrer Region"
/fertighaus/:slug                10 Regionsseiten
/ratgeber                        Ratgeber-Übersicht
/ratgeber/:slug                  4 Ratgeber-Artikel
/kontakt                         Kontakt + Formular
/impressum /datenschutz          Rechtstexte (Platzhalter)
*                                404

──────────── STARTSEITE ────────────
1. HERO: Vollbild (min-h-screen). Platzhalter für Hintergrund-Video (autoplay, muted, loop, playsinline, lazy, mit Poster-Bild; solange kein Video da ist, Poster als eager <img>). Dunkler Scrim von unten für Lesbarkeit. Darüber, unten ausgerichtet: H1 "Ihr Fertighaus. Individuell geplant, schlüsselfertig zum Festpreis." + 1 Satz USP + primärer CTA "Beratung vereinbaren" + sekundärer Link "Gebaute Häuser ansehen". Zeilen steigen beim Laden versetzt auf.
2. USP-STATEMENT: Große Boska-Aussage links (7 Spalten) über die Bauweise (zweimal gebaut: erst millimetergenau im Werk, dann in Tagen aufs Grundstück), Absatz. Rechts (4 Spalten) ein Hochformat-Bild (Handwerk). Darunter Hairline-Register mit 3 Belegen: "12 Monate" Festpreisgarantie · "EH 40" Effizienzhaus ab Werk · "8–10 Wochen" bis zur Übergabe.
3. HAUSTYP-TEASER (bg-stone): SectionIntro "Vier Haustypen. Unendlich viele Grundrisse." Ein Satteldachhaus groß featured (7 Spalten, Zoom-Bild), rechts drei kompakte Typen (Stadtvilla, Bungalow, Bauhaus) als kleine Bild+Text-Zeilen. Button "Alle Haustypen entdecken".
4. REFERENZ-PREVIEW: SectionIntro "Gebaut, bezogen, bewohnt." Ein entschiedenes, überbreites Bild (21/9), darunter Bildunterschrift + Link "Alle Referenzen ansehen".
5. ABLAUF: Links (4 Spalten) H2 "In fünf Schritten ins eigene Haus" + Absatz + Button. Rechts (7 Spalten) nummerierte Liste 01–05 (Erstgespräch / Entwurf & Festpreis / Bemusterung / Fertigung im Werk / Montage & Übergabe) mit Hairlines, Oxide-Nummern.
6. ZAHLEN/TRUST (bg-graphite, weißer Text): H2 "Verlässlichkeit können Sie nachrechnen." + Hairline-Register: "seit 1998" · "1.250+" übergebene Häuser · "12 Monate" Festpreisgarantie · "EH 40" Standard ab Werk. Schlusssatz zu Bauvertrag nach BGB (5 Jahre Gewährleistung, Zahlung nach Baufortschritt).
7. FAQ: 5 Fragen (siehe FAKTEN) im Akkordeon, rechts kleiner CTA-Block.

──────────── HAUSTYPEN ────────────
Übersicht: H1 mit Bezug "Haustypen / Fertighaus individuell planen", Einleitung (Keyword: Architektenhaus als Fertighaus). 6 alternierende Editorial-Zeilen (Bild groß, Text versetzt, gespiegelt, wechselnde Formate): je Name (Boska, Link) + Tagline + 2 Kernfakten (Wohnfläche, Preis ab) + Link zur Detailseite. Abschluss-CTA auf bg-stone.
Die 6 Typen:
- Stadtvilla – zwei Vollgeschosse, Walm-/Zeltdach, ab 145 m², ab 495.000 €
- Satteldachhaus – klassische Proportion, ab 120 m² (Einfamilienhaus)
- Bungalow – eine Ebene, barrierearm, ab 95 m², ab 355.000 €
- Bauhaus – Flachdach, kubisch, ab 130 m²
- Doppelhaus – zwei Parteien, wirtschaftlich
- Mehrgenerationenhaus – mit Einliegerwohnung, ab 640.000 €
Detailseite je Typ: Breadcrumbs; H1 (Name + Kaufargument); Hero-Bild (eager, breit); Fakten-Register (dl mit Hairlines: Wohnfläche, Geschosse, Dachform, Bauweise "Holztafelbau, werkseitig vorgefertigt", Energiestandard "Effizienzhaus 40", Preis ab); Fließtext-Body 350–500 Wörter (Architektur, für wen, Grundriss-Logik, 2–3 H2); asymmetrische Galerie (2–3 Bilder, verschiedene Formate); 3–4 typspezifische FAQ; Querverweis auf 2 andere Haustypen; Abschluss-CTA.

──────────── REFERENZEN ────────────
Übersicht: H1 um "Fertighaus-Erfahrungen / gebaute Häuser statt Renderings". Asymmetrisches Galerie-Raster (12er-Grid, wechselnde Spannen/Formate/Versätze, KEIN uniformes Raster). Je Projekt: Bild (Zoom-Hover), Titel, Meta (Ort · Jahr · Wohnfläche – leere Felder auslassen). Abschluss-CTA (Graphite).
Projekte:
- "Bautagebuch: Einfamilienhaus im Bau" (order 1, Kategorie Neubau, OHNE Ortsangabe, OHNE erfundene Fakten) – EIN Haus, dokumentiert in 3 Baustellen-Momenten (Rohbau im Winter mit Gerüst & frisch gedecktem Dach / offener Dachstuhl aus der Drohne / neue vertikale Holzfassade). Text: warum wir Baustellen zeigen ("Ein Haus beurteilt man am Ergebnis – einen Baupartner am Weg dorthin"). 3 Bild-Platzhalter markiert als "echtes Kundenfoto einsetzen".
- "Stadtvilla am Park" (Königs Wusterhausen), "Haus am Hang" (Esslingen, 178 m², bezogen nach 7 Monaten), "Bungalow im Obstgarten" (Lüneburger Heide) – Demo-Referenzen mit Fakten-Register, Baubericht (Ausgangslage → Lösung → Ergebnis), Zitat der Baufamilie (mit Nachname), Galerie.
Detailseite: Breadcrumbs; H1 = Titel; Meta-Zeile; Hero breit (eager); Fakten-Register (nur vorhandene Werte); Baubericht; Galerie; Zitat als Blockquote (Boska, Hairlines oben/unten, KEIN border-left); "Nächstes Projekt"-Link; Abschluss-CTA.

──────────── ABLAUF ────────────
H1 "Der Ablauf: vom Erstgespräch zum schlüsselfertigen Haus". Einleitung mit Risiko-Umkehr: drei konkrete Sorgen (versteckte Mehrkosten, Bauverzögerung, Vorkasse) je mit einem Vertragsfakt entkräftet. Kompaktes Dauer-Register (1–2 Tage wetterfest / 8–10 Wochen Bauzeit / 6–8 Monate gesamt). Dann 5 Schritte VERTIEFT im alternierenden Text↔Bild-Layout (Nummern 01–05, je 120–180 Wörter, konkretes "Sie erhalten:"-Artefakt, Dauer). Zwischensektion (bg-graphite) "Was wir versprechen – und woran Sie uns messen": Hairline-Register (12 Monate Festpreis, 0 € Vorkasse, 5 Jahre Gewährleistung nach BGB, Bürgschaften). 4 FAQ (Bauzeit gesamt, Vorleistung/Zahlplan, Eigenleistung, Festpreis). Abschluss-CTA.

──────────── ÜBER UNS ────────────
H1 "Über Hochpuls: Ein Werk, ein Versprechen". Positionierung als Manufaktur mit serieller Präzision (eigene Kategorie definieren, ruhig – NICHT "Marktführer"-Geschrei). Sektionen: großes Haltungs-Statement; "Das Werk" (Text+Bild: Holztafelbauweise, technisch getrocknetes Konstruktionsvollholz, dokumentierte Prüfprotokolle, EH 40); Zahlen-Register auf bg-graphite (seit 1998, 1.250+ Häuser, ca. 120 Mitarbeitende [Platzhalter], Weiterempfehlung [Platzhalter]); "Woran wir glauben" als versetzte Fließtext-Absätze mit Boska-Erstzeilen (KEIN Karten-Raster); Musterhaus-Hinweis (ohne erfundenen Standort) + Abschluss-CTA. Keine erfundenen Team-Fotos – nur Werk-/Handwerksbilder.

──────────── GEO / STANDORTE ────────────
Hub /fertighaus: H1 "Fertighaus in Ihrer Region" + Einleitung (bundesweiter Vertrieb, Montageteams aus dem Werk, ein Ansprechpartner je Region). Regionen als typografische Hairline-Linkliste, gruppiert nach "Bundesländer" und "Metropolregionen" (Name als Boska-Link, ein Aufhänger-Satz, 2–3 Städtenamen). KEINE Deutschlandkarte, KEIN Kartenraster. Querverweis auf /referenzen + Abschluss-CTA.
10 Regionen (jede mit EIGENSTÄNDIGEM Inhalt, 300–450 Wörter, keine Klon-Texte – sonst Doorway-Page-Abstrafung; jede Zahl mit "Stand: 07/2026", Rechtsangaben als Orientierung kennzeichnen):
- Bayern (Bundesland): niedrigste Grunderwerbsteuer 3,5 %, Holzbautradition, Baulandpreise 125 €/m² Oberfranken bis >6.900 €/m² München, BayBO-Abstandsflächen, Schneelast Alpenvorland. Städte: München, Nürnberg, Augsburg, Regensburg, Ingolstadt, Würzburg.
- Baden-Württemberg (Bundesland): landesweite PV-Pflicht Neubau, Hanggrundstücke (Schwarzwald/Alb/Neckartal), Musterhaus Fellbach. Stuttgart, Karlsruhe, Freiburg, Heidelberg, Ulm, Heilbronn.
- Nordrhein-Westfalen (Bundesland): höchste Grunderwerbsteuer 6,5 %, Bergsenkung/Altbergbau im Ruhrgebiet (Baugrundgutachten), FertighausWelten Wuppertal & Köln-Frechen. Köln, Düsseldorf, Dortmund, Essen, Münster, Bonn, Bielefeld.
- Hessen (Bundesland): "Hessengeld" (Erstattung Grunderwerbsteuer 6 %), Preisschere Rhein-Main vs. Nordhessen, Musterhaus Bad Vilbel (größte Ausstellung DE). Frankfurt, Wiesbaden, Darmstadt, Kassel, Gießen, Fulda.
- Niedersachsen (Bundesland): bezahlbares Bauland, Windlast Nordseeküste, Marsch-/Moorböden (Statik/Gründung), FertighausWelt Hannover/Langenhagen. Hannover, Braunschweig, Osnabrück, Oldenburg, Lüneburg, Göttingen.
- Berlin & Brandenburg (Metropolregion): Bauland im Speckgürtel, zwei Bauordnungen (BauO Bln vs. BbgBO), 6 % vs. 6,5 % Grunderwerbsteuer, sandige tragfähige Böden. Berlin, Potsdam, Falkensee, Bernau, Oranienburg, Königs Wusterhausen.
- Hamburg & Umland (Metropolregion): kleine teure Grundstücke, kompakte Stadtvillen (HBauO-Geschossausnutzung), Ausweichen ins Umland (SH/NDS), Windlast, Gründachstrategie. Hamburg, Norderstedt, Pinneberg, Ahrensburg, Buchholz, Stade.
- Rhein-Main (Metropolregion): drei Bundesländer (HE/RP/bayr. Untermain), Bauordnungen & Steuersätze vergleichbar gemacht, Bad Vilbel. Frankfurt, Wiesbaden, Mainz, Darmstadt, Offenbach, Hanau, Bad Vilbel.
- München & Umland (Metropolregion): teuerster Baulandmarkt (6.900–>12.000 €/m²), Bauen auf kleinen Parzellen, Einheimischenmodelle/Erbbaurecht, Musterhauspark Poing. München, Poing, Dachau, Freising, Erding, Starnberg, Fürstenfeldbruck.
- Stuttgart & Region (Metropolregion): Kessellage → Hanggrundstücke, Hangkeller als Wohnraum, Nachverdichtung, Musterhaus Fellbach (älteste DE). Stuttgart, Fellbach, Ludwigsburg, Esslingen, Böblingen, Waiblingen.
Regionsseite: Breadcrumbs; Kopf mit H1 = Regionsname, Intro als Lead, primärer CTA bereits above the fold; Hero-Bild; Body in Prosa; Abschnitt "Bauen in [Städte]"; 2–3 regionale FAQ; kleine Nachbar-/Eltern-Kind-Linkzeile (z. B. Bayern↔München, BW↔Stuttgart, Hessen↔Rhein-Main); Abschluss-CTA "Beratung für Ihr Bauvorhaben in [Region]".

──────────── RATGEBER ────────────
Übersicht: H1 "Ratgeber: Wissen für Ihre Bauentscheidung", editorial (neuester Artikel featured mit Bild + Description, übrige als Hairline-Liste: Datum · Boska-Titel · 1 Zeile). E-E-A-T-Hinweis (von der Bauberatung, aktualisiert bei Rechtsänderungen). KEIN Kartenraster.
4 Artikel (je 1.200–1.800 Wörter, Answer-first-Absätze, H2 als echte W-Fragen, Markdown-artige Tabellen, interne Links auf Money-Pages, "Stand: 07/2026", Abschluss-Absatz mit Beratungs-CTA):
- "Fertighaus-Preise 2026: Kosten pro m², Beispiele, Nebenkosten" (Median 2.800 €/m², Spanne 2.400–3.300, Premium 3.000–4.500; Beispiel 150 m²; Baunebenkosten 15–20 %; Grunderwerbsteuer-Tabelle 3,5 %→6,5 %; Eigenleistung).
- "KfW-Förderung für den Neubau 2026: 297/298 und 300 erklärt" (Kredit bis 150.000 €/Wohneinheit, EH-40-Voraussetzung, ~0,6 % Zins Anfang 2026, EH-55 läuft 31.12.2026 aus; KfW 300: Kind <18, max. 90.000 € zvE +10.000 je Kind, bis 270.000 € mit QNG; Antrag über Hausbank VOR Vertragsabschluss).
- "Fertighaus oder Massivhaus: Der ehrliche Vergleich" (Preise 2.400–3.300 vs. 2.500–3.600 €/m²; Bauzeit 8–10 Wochen vs. Monate; 1 m³ Holz bindet ~1 t CO₂; Lebensdauer 70–100 Jahre; Vergleichstabelle; "fertighaus nachteile" sachlich).
- "Schlüsselfertig oder Ausbauhaus? Leistungsumfang im Vergleich" ("schlüsselfertig" nicht gesetzlich definiert → Leistungsbeschreibung prüfen; Muskelhypothek 10.000–25.000 €, Banken bis 15 %; Ausbaustufen-Tabelle; Checkliste).
Artikelseite: Breadcrumbs; H1; Meta "Aktualisiert am [Datum] · Lesezeit ~X Min."; Hero breit; Body in Prosa (Tabellen gestylt); "Weiterlesen" mit 2 Artikeln; Abschluss-CTA (bg-stone).

──────────── KONTAKT ────────────
H1 "Sprechen wir über Ihr Haus." + Absatz (Antwort innerhalb eines Werktags, ohne Verkaufsdruck). Formular (progressiv, clientseitig validiert, an Platzhalter-Endpoint): Name, E-Mail, Telefon (optional), PLZ/Region, Select "Wo stehen Sie gerade?" (Grundstück vorhanden / Suche läuft / informieren zuerst), Nachricht (optional), Datenschutz-Checkbox, Honeypot-Feld gegen Spam. Erfolgs- und Fehlerzustand in Textform. autocomplete-Attribute, echte <label>. Sidebar: direkter Draht (Telefon, Öffnungszeiten, E-Mail) + "So geht es weiter" (3 Schritte). EIN primärer CTA.

──────────── RECHTLICH & 404 ────────────
Impressum & Datenschutz als Platzhalter-Seiten (noindex) mit TODO-Hinweisen (Pflichtangaben § 5 DDG bzw. vollständige DSGVO-Erklärung vor Launch einsetzen). 404 (noindex): große "404", Boska-Headline, Links zur Startseite und zu Haustypen.

═══════════════════════════════════════════
INHALTLICHE FAKTEN (für korrekte Texte – NICHT erfinden)
═══════════════════════════════════════════
- Preis schlüsselfertig 2026: Median 2.800 €/m², Spanne 2.400–3.300, Premium 3.000–4.500.
- Bauzeit: Elemente 1–2 Tage wetterfest montiert; inkl. Innenausbau 8–10 Wochen; Vertrag bis Einzug 6–8 Monate.
- "Schlüsselfertig" = nicht gesetzlich definiert; hier bezugsfertig inkl. Bäder, Böden, Innentüren.
- Bauweise: Holztafelbau, werkseitig vorgefertigt, Effizienzhaus 40 ab Werk (Wärmepumpe, Lüftung, PV-Vorbereitung).
- Gewährleistung 5 Jahre nach BGB ab Abnahme. Festpreisgarantie 12 Monate ab Vertragsabschluss. Zahlung nach Baufortschritt, Bürgschaften.
- KfW 297/298: bis 150.000 €/Wohneinheit, EH 40, ~0,6 % Zins Anfang 2026; EH 55 (~1,0 %) läuft 31.12.2026 aus. KfW 300: bis 270.000 €, Einkommensgrenze 90.000 € zvE +10.000 je Kind.
- Baunebenkosten 15–20 %. Grunderwerbsteuer 3,5 % (Bayern) bis 6,5 % (NRW/Brandenburg). Eigenleistung realistisch 10.000–25.000 €, Muskelhypothek bis 15 % der Darlehenssumme.
- Lebensdauer 70–100 Jahre. 1 m³ Holz bindet ~1 t CO₂.
- Firmensitz (Platzhalter): Musterallee 12, 60311 Frankfurt am Main. Telefon 0800 000 00 00. E-Mail beratung@hochpuls.de. Gegründet 1998.
5 Start-FAQ: Preis pro m² 2026 / Bauzeit / Bedeutung "schlüsselfertig" / individuell planbar / KfW-Förderung 2026 – Antworten je 2–4 Sätze mit den obigen Zahlen.

═══════════════════════════════════════════
SEO & META
═══════════════════════════════════════════
Pro Seite via react-helmet-async: <title> 50–60 Zeichen (Fokus-Keyword vorn, Marke "| Hochpuls" hinten), meta description 150–160 Zeichen mit Zahl/USP + CTA, canonical, Open Graph (og:title/description/image/url, og:locale de_DE), twitter:card. <html lang="de">. Genau EINE h1 pro Seite. Semantische Überschriftenhierarchie, H2/H3 mit Sekundär-Keywords/W-Fragen.
JSON-LD (application/ld+json):
- Sitewide: Organization als @graph, @type ["HomeAndConstructionBusiness","GeneralContractor"], mit name, legalName "Hochpuls GmbH", url, logo, address (PostalAddress DE), contactPoint (sales, de), areaServed {Country "Deutschland"}, priceRange "€€€", knowsAbout, sameAs – plus WebSite-Knoten. KEIN aggregateRating (self-serving), KEIN LocalBusiness ohne echte Standortadresse.
- Unterseiten: BreadcrumbList. Ratgeber: Article. FAQ-Sektionen: FAQPage (optional, kein SERP-Feature mehr – schadet nicht).
Sitemap.xml und robots.txt generieren. Interne Verlinkung als Themencluster (Ratgeber → Haustypen/Ablauf/Regionen/Kontakt und zurück).

═══════════════════════════════════════════
BARRIEREFREIHEIT (WCAG AA)
═══════════════════════════════════════════
Fließtext ≥ 4,5:1, große Headlines ≥ 3:1 (durch die Tokens erfüllt). Sichtbare Fokuszustände (2px Oxide-Outline) auf allen interaktiven Elementen. Vollständige Tastaturbedienung (Menü, Akkordeon, Formular). Skip-Link "Zum Inhalt springen". Semantisches HTML (nav/main/footer, eine h1). Alle Bilder mit aussagekräftigen deutschen Alt-Texten in Markenstimme ("Flachdachhaus mit vertikaler Holzlamellenfassade in der Abenddämmerung", nicht "schönes Haus"). Formular mit echten Labels, Fehlermeldungen in Textform, autocomplete. prefers-reduced-motion respektieren.

═══════════════════════════════════════════
BILDER & ASSETS
═══════════════════════════════════════════
Für die Erstversion hochwertige Architektur-Stockfotos verwenden (moderne Einfamilienhäuser mit Holzfassade/Satteldach/Flachdach, Innenräume mit Eiche & Tageslicht, Holzrahmenbau-Baustellen, Beratung/Familie/Schlüsselübergabe) – Motive mit Licht und Material, keine Deko-Thumbnails, wechselnde Bildformate. Hero-Video als Platzhalter-Slot (Poster-Fallback). Die 3 echten Baustellenfotos des Kunden sind für das "Bautagebuch"-Projekt vorgesehen (ein Haus, ohne Ortsangabe) – als klar markierte Platzhalter einbauen. Firmenname "Hochpuls", Kontaktdaten, Domain und Formular-Endpoint zentral in einer Config-Datei, damit sie an einer Stelle austauschbar sind.

Ziel: Lighthouse ≥ 95 in allen vier Kategorien, schnelles LCP, kein Layout-Shift (Bilder mit width/height bzw. aspect-ratio). Baue produktionsreif, nicht als Prototyp – jede Seite beautiful, responsive, präzise, on brand.
