/**
 * Zentrales Bildregister.
 *
 * Zwei Quellen, strikt getrennt:
 * - /projekte/referenzen/ zeigt ausschliesslich eigene, ausgefuehrte Projekte.
 * - /rohbau/ sind Lizenzbilder (Pexels/Pixabay, kommerziell nutzbar ohne
 *   Namensnennung). Sie illustrieren die Bauweise und werden nie als eigenes
 *   Projekt ausgegeben.
 * - /werk/ und /bau/ stammen aus der eigenen Fertigung bzw. sind
 *   Visualisierungen eigener Entwuerfe.
 *
 * Bilder unter /rohbau/, /bau/ und /werk/ liegen mindestens in den Breiten 640,
 * 1024 und 1600 vor; referenziert wird immer die 1600er-Datei, die Breiten
 * darueber liest src/lib/img.ts zur Bauzeit vom Dateisystem.
 */

export interface Asset {
  src: string;
  alt: string;
}

export const IMG = {
  /* ── Rohbau ──────────────────────────────────────────────────
     Lizenzbilder (Pexels/Pixabay, kommerziell nutzbar ohne Namens-
     nennung). Sie zeigen die Bauweise, nie ein eigenes Projekt –
     eigene Projektfotos stehen ausschliesslich in den Referenzen. */
  rohbauSkelett: {
    src: '/rohbau/skelett-kran-1600.webp',
    alt: 'Stahlbetonskelett eines mehrgeschossigen Gebäudes mit Turmdrehkran vor bewölktem Himmel',
  },
  rohbauBewehrung: {
    src: '/rohbau/bewehrungsmatten-1600.webp',
    alt: 'Gestapelte Bewehrungsmatten aus Betonstahl auf der Baustelle',
  },
  rohbauSchalung: {
    src: '/rohbau/innen-schalung-1600.webp',
    alt: 'Wandschalung und Deckenstützen im Rohbau vor dem Betonieren',
  },
  rohbauMauerwerk: {
    src: '/rohbau/mauerwerk-1600.webp',
    alt: 'Aufgehendes Mauerwerk aus großformatigen Planelementen auf der Bodenplatte',
  },
  rohbauDecke: {
    src: '/rohbau/deckenschalung-1600.webp',
    alt: 'Deckenschalung aus Holzträgern und Stützen von unten gesehen',
  },
  kitaEingang: {
    src: '/bau/sozial-und-bildung/kita-eingang-1600.webp',
    alt: 'Eingangsbereich einer eingeschossigen Kindertagesstätte mit farbigen Stützen und Vordach',
  },
  rohbauKranwald: {
    src: '/rohbau/kranwald-1600.webp',
    alt: 'Mehrere Turmdrehkrane über einer Großbaustelle als Silhouette vor dem Abendhimmel',
  },
  rohbauZeile: {
    src: '/rohbau/zeile-geruest-1600.webp',
    alt: 'Langgestreckter Rohbau im Gerüst, Geschossdecken und Fassade im Entstehen',
  },
  rohbauWohnanlage: {
    src: '/rohbau/wohnanlage-1600.webp',
    alt: 'Mehrere Wohngebäude im Rohbau mit geschlossenen Geschossdecken',
  },
  rohbauKraene: {
    src: '/rohbau/kraene-1600.webp',
    alt: 'Zwei Turmdrehkrane über einem mehrgeschossigen Neubau vor blauem Himmel',
  },
  rohbauInnen: {
    src: '/rohbau/innen-stuetzen-1600.webp',
    alt: 'Rohbau-Innenraum mit Betonstützen, Wandschalung und Deckenstützen',
  },
  bestandGeruest: {
    src: '/rohbau/bestand-geruest-1600.webp',
    alt: 'Eingerüstetes Bestandsgebäude während Umbau und Sanierung',
  },

  /* ── Entwürfe ────────────────────────────────────────────── */
  heroGewerbe: {
    src: '/projekte/referenzen/hannover-citygate-1200.webp',
    alt: 'Büro- und Verwaltungsgebäude City Gate Nord in Hannover-Vahrenwald, sechs Geschosse mit Klinkerfassade',
  },


  /* ── Werk: Vorfertigung ──────────────────────────────────── */
  holzMaterial: {
    src: '/werk/werk-halle-wandelement-1600.webp',
    alt: 'Fertiges Wandelement mit gesetztem Fensterband in der Produktionshalle, Holzwerkstoffplatten sichtbar',
  },
  werkHalle: {
    src: '/werk/werk-halle-modul-1600.webp',
    alt: 'Blick in die Fertigungshalle: fertiges Raummodul und aufgestellter Dachbinder unter der Kranbahn',
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
    src: '/werk/werk-wandelemente-1600.webp',
    alt: 'Aufgestellte Wandelemente in der Fertigungshalle: Ständerwerk mit eingelegter Dämmung',
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
