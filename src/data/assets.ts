/**
 * Zentrales Bildregister.
 *
 * Alle Unsplash-URLs wurden per Fetch verifiziert (siehe docs/research/bilder.json).
 * Echte Projektfotos ersetzen die Stand-ins dateiweise — Anleitung in ASSETS.md.
 * `standIn: true` markiert Bilder, die für Referenz-Projekte durch die
 * Original-Fotos des Kunden ausgetauscht werden sollen.
 */

export interface Asset {
  src: string;
  alt: string;
  standIn?: boolean;
}

export const IMG = {
  /* Architektur außen */
  heroHome: {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Flachdachhaus mit vertikaler Holzlamellenfassade und raumhoher Verglasung, warm beleuchtet in der Abenddämmerung',
  },
  bauhausWinter: {
    src: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1600&q=80',
    alt: 'Kubisches Flachdachhaus mit raumhoher Glasfassade, warm beleuchtete Wohnebenen am Winterabend',
  },
  bungalowGold: {
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80',
    alt: 'Eingeschossiger Flachdach-Bungalow mit rahmenloser Verglasung und auskragendem Dach im goldenen Abendlicht',
  },
  stadtvilla: {
    src: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80',
    alt: 'Weiße kubische Stadtvilla mit klar gegliederten Fensteröffnungen und überdachtem Eingang',
  },
  eingang: {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    alt: 'Hauseingang mit Treppenaufgang und warmweißer Fassadenbeleuchtung zur blauen Stunde',
  },
  satteldach: {
    src: 'https://images.unsplash.com/photo-1469964062538-06fad433a132?auto=format&fit=crop&w=1600&q=80',
    alt: 'Modernes Satteldachhaus mit dunkler vertikaler Holzschalung und giebelförmigem Panoramafenster',
  },
  holzfassadeDetail: {
    src: 'https://images.unsplash.com/photo-1605018075968-b014b8d2e487?auto=format&fit=crop&w=1600&q=80',
    alt: 'Auskragendes Obergeschoss mit flächenbündiger Holzverkleidung und schwarz gerahmtem Fenster',
  },
  holzMaterial: {
    src: 'https://images.unsplash.com/photo-1515713519566-6f9bf3b4a07a?auto=format&fit=crop&w=1600&q=80',
    alt: 'Materialdetail einer Holzfassade: helle Schalung in mehreren Ebenen im Streiflicht',
  },
  fassadeRot: {
    src: 'https://images.unsplash.com/photo-1639818019702-bba773c78923?auto=format&fit=crop&w=1600&q=80',
    alt: 'Giebelfassade in dunkelroter Holzschalung mit vertikaler Lamellenblende vor dem Fenster',
  },

  /* Innenräume */
  kuecheEiche: {
    src: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80',
    alt: 'Offene Küche mit Eichenfronten, Kochinsel und bodentiefem Zugang zur Terrasse',
  },
  kuecheLicht: {
    src: 'https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?auto=format&fit=crop&w=1600&q=80',
    alt: 'Grifflose Küchenzeile mit indirekter Beleuchtung unter einer Decke aus Holzlamellen',
  },
  wohnraum: {
    src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80',
    alt: 'Wohnraum mit grauem Sofa, Massivholz-Couchtischen und Tageslicht aus raumhoher Verglasung',
  },
  treppe: {
    src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80',
    alt: 'Halbgewendelte Eichentreppe mit schwarzem Stahlgeländer und Pendelleuchten im Luftraum',
  },
  bad: {
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    alt: 'Bad mit bodengleicher Glasdusche, Doppelwaschtisch und schwarzen Armaturen',
  },

  /* Baustelle & Handwerk — Stand-ins für echte Projektfotos */
  dachstuhl: {
    src: 'https://images.unsplash.com/photo-1676802037786-3697d60497ae?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dachstuhl im Holzrahmenbau: präzise gefügte Sparren und Binder vor blauem Himmel',
    standIn: true,
  },
  richtarbeiten: {
    src: 'https://images.unsplash.com/photo-1690719095815-549c60090c9f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Richtarbeiten am Holzrahmenhaus: Dachbinder auf frisch gestellten Wandelementen',
    standIn: true,
  },
  montage: {
    src: '/projekte/montage-kranarbeiten-1600.webp',
    alt: 'Montage auf der Baustelle: Ein Autokran setzt vorgefertigte Elemente auf die Bodenplatte, zwei Monteure arbeiten auf der Decke',
  },
  kran: {
    src: 'https://images.unsplash.com/photo-1569169513673-2cecbfc943a9?auto=format&fit=crop&w=1600&q=80',
    alt: 'Gelber Turmdrehkran über eingerüstetem Rohbau vor wolkenlosem Himmel',
    standIn: true,
  },
  handwerk: {
    src: 'https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=1600&q=80',
    alt: 'Handwerkliche Präzision: Stemmeisen folgt der Anrisslinie im hellen Massivholz',
  },

  elementmontage: {
    src: '/projekte/elementmontage.webp',
    alt: 'Kranmontage: Eine vorgefertigte Wandscheibe mit Fensteröffnung wird auf die bereits stehenden Elemente gesetzt',
  },

  /* Menschen & Prozess */
  planung: {
    src: 'https://images.unsplash.com/photo-1608303588026-884930af2559?auto=format&fit=crop&w=1600&q=80',
    alt: 'Planungsgespräch über Grundrissen: Hände mit Dreikantmaßstab und Bleistift am Bauplan',
  },
  beratung: {
    src: 'https://images.unsplash.com/photo-1616587656879-8a8a7cce9d6c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Bemusterungstermin: Beraterin und Bauherr sichten Materialproben am Planungstisch',
  },
  familieTreppe: {
    src: 'https://images.unsplash.com/photo-1709787627975-9cb37bbeca60?auto=format&fit=crop&w=1600&q=80',
    alt: 'Junge Familie mit Kleinkind auf der Eingangstreppe ihres neuen Einfamilienhauses',
  },
  familieAbend: {
    src: 'https://images.unsplash.com/photo-1756982784720-f1832150e5cb?auto=format&fit=crop&w=1600&q=80',
    alt: 'Familie auf der Verandatreppe ihres Hauses im goldenen Abendlicht',
  },
  schluessel: {
    src: 'https://images.unsplash.com/photo-1744782351841-9cc6b86a5add?auto=format&fit=crop&w=1600&q=80',
    alt: 'Schlüsselübergabe im Neubau: Hand hält Schlüsselbund mit Haus-Anhänger vor der Treppe',
  },
} as const satisfies Record<string, Asset>;

export type ImgKey = keyof typeof IMG;
