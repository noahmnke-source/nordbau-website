/**
 * Zentrales Bildregister.
 *
 * Alle Aufnahmen stammen aus der eigenen Fertigung und von eigenen Baustellen –
 * Architekturvisualisierungen der Entwürfe sowie Fotos aus Werk und Montage.
 * Stockfotos werden auf dieser Website nicht verwendet.
 *
 * Bilder unter /haeuser/, /bau/ und /werk/ liegen in den Breiten 640, 1024 und
 * 1600 vor; referenziert wird immer die 1600er-Datei (siehe src/lib/img.ts).
 */

export interface Asset {
  src: string;
  alt: string;
}

export const IMG = {
  /* ── Entwürfe ────────────────────────────────────────────── */
  heroHome: {
    src: '/haeuser/einfamilienhaus/flachdach-abendlicht-1600.webp',
    alt: 'Zweigeschossiges Wohnhaus mit dunkler Holzfassade, auskragendem Obergeschoss, Pool und Rasenfläche im Abendlicht',
  },
  satteldach: {
    src: '/haeuser/einfamilienhaus/satteldach-photovoltaik-1600.webp',
    alt: 'Einfamilienhaus mit Satteldach, vollflächiger Photovoltaikanlage und bodentiefen Fenstern',
  },
  bauhausWinter: {
    src: '/haeuser/einfamilienhaus/flachdach-anthrazit-1600.webp',
    alt: 'Anthrazitfarbenes Flachdachhaus mit holzverkleideter Loggia und Wasserbecken davor',
  },
  bungalowGold: {
    src: '/haeuser/bungalow/bungalow-holzgiebel-1600.webp',
    alt: 'Eingeschossiger Bungalow mit steilem Giebeldach, dunkler Holzschalung und Pool, abends beleuchtet',
  },
  fassadeRot: {
    src: '/haeuser/tiny-haus/tiny-panoramafront-1600.webp',
    alt: 'Tiny Haus mit raumhoher Panoramaverglasung, dunkler Hülle und farbigem Eingangselement',
  },
  modulhaus: {
    src: '/haeuser/modulhaus/modul-zweigeschossig-1600.webp',
    alt: 'Zweigeschossiges Modulhaus aus versetzt gestapelten Raummodulen mit Pool und Holzterrasse',
  },

  /* ── Innenräume ──────────────────────────────────────────── */
  kuecheEiche: {
    src: '/haeuser/einfamilienhaus/innen-wohnen-1600.webp',
    alt: 'Offener Wohn- und Essbereich mit Holzeinbauten, Kochinsel und raumhoher Verglasung zum Garten',
  },
  schlafen: {
    src: '/haeuser/einfamilienhaus/innen-schlafzimmer-1600.webp',
    alt: 'Schlafzimmer mit Doppelbett, hölzerner Wandverkleidung und raumhohem Einbauschrank',
  },

  /* ── Werk: Vorfertigung ──────────────────────────────────── */
  holzMaterial: {
    src: '/werk/werk-halle-wandelement-1600.webp',
    alt: 'Fertiges Wandelement mit gesetztem Fensterband in der Produktionshalle, Holzwerkstoffplatten sichtbar',
  },
  werkHalle: {
    src: '/werk/werk-fensterelement-1600.webp',
    alt: 'Vorgefertigtes Wandelement mit eingebauter Fenster- und Türfront, aufgestellt in der Fertigungshalle',
  },
  werkTeam: {
    src: '/werk/werk-team-1600.webp',
    alt: 'Mitarbeiter des Werks vor einem fertig ausgebauten Raummodul mit gesetzter Fensterfront',
  },
  werkAbbund: {
    src: '/werk/werk-abbund-1600.webp',
    alt: 'Mitarbeiter beim Abbinden eines Deckenelements in der Fertigungshalle',
  },
  werkFenster: {
    src: '/werk/werk-fensterband-1600.webp',
    alt: 'Fertiges Wandelement mit eingebautem Fensterband in der Produktionshalle',
  },
  werkFassade: {
    src: '/werk/werk-fassadenrost-1600.webp',
    alt: 'Fassadenunterkonstruktion aus Holz an einem Wandelement in der Halle',
  },

  /* ── Baustelle: Montage ──────────────────────────────────── */
  montage: {
    src: '/projekte/montage-kranarbeiten-1600.webp',
    alt: 'Montage auf der Baustelle: Ein Autokran setzt vorgefertigte Elemente auf die Bodenplatte, zwei Monteure arbeiten auf der Decke',
  },
  kranModul: {
    src: '/werk/montage-kran-modul-1600.webp',
    alt: 'Ein Autokran setzt ein vorgefertigtes Wandelement über der Baustelle ab',
  },
  montageFertig: {
    src: '/werk/montage-fertig-1600.webp',
    alt: 'Fertiggestelltes Wohnhaus kurz vor der Übergabe, Fassade geschlossen und Fenster gesetzt',
  },
  elementmontage: {
    src: '/projekte/elementmontage.webp',
    alt: 'Kranmontage: Eine vorgefertigte Wandscheibe mit Fensteröffnung wird auf die bereits stehenden Elemente gesetzt',
  },
  bungalowRohbau: {
    src: '/projekte/bungalow-rohbau.webp',
    alt: 'Bungalow kurz nach dem Richten: geschlossene Gebäudehülle mit gesetzten Fenstern, Zimmerer deckt den hölzernen Dachstuhl des Walmdachs',
  },
} as const satisfies Record<string, Asset>;

export type ImgKey = keyof typeof IMG;
