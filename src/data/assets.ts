/**
 * Zentrales Bildregister.
 *
 * Zwei Quellen, strikt getrennt:
 * - /projekte/referenzen/ zeigt ausschliesslich eigene, ausgefuehrte Projekte.
 * - /rohbau/ sind Lizenzbilder (Pexels/Pixabay, kommerziell nutzbar ohne
 *   Namensnennung). Sie illustrieren die Bauweise und werden nie als eigenes
 *   Projekt ausgegeben.
 * - /bau/ sind Visualisierungen eigener Entwuerfe.
 *
 * Bilder unter /rohbau/ und /bau/ liegen mindestens in den Breiten 640,
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

  /* ── Eigene Baustellenfotos ─────────────────────────────── */
  tiefbauFundament: {
    src: '/projekte/baustelle/streifenfundament-960.webp',
    alt: 'Ausgehobene Fundamentgräben mit eingelegten Bewehrungskörben und verlegten Entwässerungsrohren',
  },

  /* ── Weitere Motive ─────────────────────────────────────── */
  rohbauNacht: {
    src: '/rohbau/nacht-1600.webp',
    alt: 'Eingerüstetes Hochhaus im Rohbau bei Nacht, beleuchtete Gerüstlagen vor dunklem Himmel',
  },
  rohbauGlasbau: {
    src: '/rohbau/kran-glasbau-1600.webp',
    alt: 'Bürogebäude im Rohbau mit Gerüst, Stahlkonstruktion des Dachabschlusses und Turmdrehkran',
  },
  rohbauBewehrungStapel: {
    src: '/rohbau/bewehrung-stapel-1600.webp',
    alt: 'Gestapelte Bewehrungsmatten aus Betonstahl, Nahaufnahme des Rastergeflechts',
  },
  bestandEntkernt: {
    src: '/rohbau/bestand-entkernt-1600.webp',
    alt: 'Entkernter Innenraum eines Bestandsgebäudes vor dem Wiederaufbau',
  },
  heroGewerbe: {
    src: '/projekte/referenzen/hannover-citygate-1200.webp',
    alt: 'Büro- und Verwaltungsgebäude City Gate Nord in Hannover-Vahrenwald, sechs Geschosse mit Klinkerfassade',
  },
} as const satisfies Record<string, Asset>;

export type ImgKey = keyof typeof IMG;
