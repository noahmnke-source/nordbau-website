# Product

## Register

brand

## Platform

web

## Users

Kaufkräftige Bauinteressenten in Deutschland (30–55, Haushaltseinkommen deutlich über Median, oft Doppelverdiener oder Unternehmer). Sie vergleichen 3–5 Fertighaus-Anbieter parallel, recherchieren abends am Sofa (Mobile) und vertiefen am Desktop. Ihr Job-to-be-done: einen Anbieter finden, dem sie ein sechs- bis siebenstelliges Projekt und zwei Jahre ihres Lebens anvertrauen. Die Website muss in Sekunden signalisieren: hier arbeiten Leute, die präziser sind als alle anderen. Konversionsziel: Beratungstermin.

## Product Purpose

Marketing-Website für die Hochpuls GmbH (Konfiguration zentral in `src/config/site.ts`), einen Anbieter schlüsselfertiger und individuell geplanter Fertighäuser mit bundesweitem Vertrieb. Erfolg = qualifizierte Beratungsanfragen. Sekundär: bundesweite organische Sichtbarkeit über Money-Pages (Haustypen) und skalierbare Standortseiten.

## Brand Personality

Gebaut, ruhig, präzise. Die Marke spricht wie ein Architekt, nicht wie ein Verkäufer: kurze Sätze, konkrete Zahlen, keine Superlative ohne Beleg. Emotionales Ziel beim Besucher: ruhige Gewissheit ("die haben es im Griff") statt Kaufdruck. Warmherzigkeit kommt aus Fotografie und Materialsprache (Holz, Stein, Corten), nie aus Floskeln.

## Anti-references

- Der Template-Look der Branche: Slider-Hero mit drei rotierenden Versprechen, Icon-Karten-Raster ("Qualität / Erfahrung / Service"), Zähler-Widgets, die beim Scrollen hochzählen.
- SaaS-Landingpage-Grammatik (Gradient-Buttons, Glassmorphism, Hero-Metriken) — falsches Register für ein Bauunternehmen.
- Fertighaus-Klischee-Kitsch: Familien-Stockfotos mit Umarmung vor Rohbau, Herz-Icons, "Traumhaus"-Inflation.
- Überladene Immobilienportal-Ästhetik (Badges, Sternchen, Preis-Störer).

## Design Principles

1. **Ruhe ist Kompetenz.** Weißraum, wenige Farben, große ruhige Typografie. Wer 400.000 € ausgibt, will keinen Jahrmarkt.
2. **Zeigen, nicht behaupten.** Echte Projekte, echte Zahlen (Bauzeit, Energiestandard, Festpreis), Prozess in konkreten Schritten. Jede Behauptung hat einen Beleg im sichtbaren Umfeld.
3. **Das Foto ist das Design.** Architekturfotografie trägt die Seite; Layout und Typografie rahmen sie nur. Bilder groß, unbeschnitten in ihrer Wirkung, nie als Deko-Thumbnail.
4. **Ein Weg, ein Ziel.** Jede Seite führt zur Beratung. Ein primärer CTA pro Viewport, keine konkurrierenden Aktionen.
5. **Präzision bis ins Detail.** Konsistentes Spacing-System, gepflegte Hover- und Fokuszustände, korrekte Typografie (echte Anführungszeichen, geschützte Leerzeichen bei Einheiten).

## Accessibility & Inclusion

WCAG 2.1 AA als Minimum: Körpertext ≥ 4,5:1, große Überschriften ≥ 3:1, sichtbare Fokuszustände auf allen Interaktiven, vollständige Tastaturbedienung (Menü, Akkordeons, Formular). `prefers-reduced-motion` reduziert alle Animationen auf Crossfades/instant. Semantisches HTML (ein `h1` pro Seite, Landmarken, `nav`/`main`/`footer`). Formulare mit echten Labels, Fehlermeldungen in Textform, `autocomplete`-Attribute. Alt-Texte in Markenstimme, deutschsprachig.
