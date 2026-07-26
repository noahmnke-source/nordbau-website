/**
 * Zentrale Firmen- und Site-Konfiguration.
 *
 * ── VOR LAUNCH PRÜFEN ────────────────────────────────────────
 * Firmen- und Rechtsdaten sind gesetzt. Noch zu prüfen: die Domain
 * (Platzhalter, unten `url` + astro.config.mjs + robots.txt), der
 * Formular-Endpoint, die Social-Profile und die Kennzahlen in
 * PRODUCT.md-nahen Seiten (Über uns / Startseite).
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Markenname, erscheint in Logo, Titeln, Copy */
  name: 'Nordbau',
  /** Juristischer Name für JSON-LD / Impressum */
  legalName: 'Nordbau GmbH',
  /** Produktions-Domain — PLATZHALTER: muss mit astro.config.mjs `site` + robots.txt übereinstimmen */
  url: 'https://www.nord-bau.de',
  /** Claim, erscheint u. a. im Footer und als OG-Fallback */
  claim: 'Architektur in Serie. Gebaut für Sie.',
  /** Meta-Title-Suffix */
  titleSuffix: 'Nordbau GmbH – Fertighäuser schlüsselfertig & individuell',

  contact: {
    phone: '+49 155 63046447',
    phoneDisplay: '0155 63046447',
    email: 'info.nord-bau@gmx.de',
    street: 'Noldestr. 40',
    zip: '30827',
    city: 'Berenbostel',
  },

  /** Rechtliche Pflichtangaben (Impressum, JSON-LD) */
  legal: {
    taxNumber: '27/200/14251',
    vatId: 'DE454914037',
    register: 'HRB 228155',
    court: 'Amtsgericht Hannover',
  },

  /**
   * Formular-Endpoint (Platzhalter). Vor Launch durch echten Endpoint
   * ersetzen, z. B. Formspree, Netlify Forms oder eigene API-Route.
   */
  formEndpoint: 'https://formspree.io/f/PLATZHALTER',

  social: {
    instagram: 'https://www.instagram.com/nordbau',
    youtube: 'https://www.youtube.com/@nordbau',
    pinterest: 'https://www.pinterest.de/nordbau',
  },

  /**
   * Gründungsjahr für "seit"-Angaben und JSON-LD.
   * Tree House nennt in den Unterlagen kein exaktes Jahr, sondern „über ein
   * Jahrzehnt Erfahrung“ – daher 2013 als belegbare Untergrenze gesetzt.
   * Falls das genaue Jahr bekannt ist, hier eintragen.
   */
  foundingYear: 2013,
} as const;

export type Site = typeof SITE;
